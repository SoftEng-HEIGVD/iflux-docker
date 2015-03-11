var
	_ = require('underscore'),
	dotenv = require('dotenv'),
	copilot = require('api-copilot');

dotenv.load();

var scenario = new copilot.Scenario({
  name: 'Populate rules',
	summary: 'Try to retrieve existing rules and then creating the missing ones',
	defaultRequestOptions: {
		json: true
	}
});

scenario.addParam('iflux_url', {
	default: process.env.IFLUX_SERVER_URL || 'http://ifluxsrv:3000'
});

scenario.addParam('slack_url', {
	default: process.env.IFLUXSLACK_SERVER_URL || 'http://ifluxslack:3001'
});

scenario.addParam('metrics_url', {
	default: process.env.IFLUXMETRICS_SERVER_URL || 'http://ifluxmetrics:3002'
});

var rules = {
	"SC-CE-AE-SLACK": {
		description: "Send text notification to slack when action occurred.",
		reference: "SC-CE-AE-SLACK",
		if: {
			eventSource: "smartCity/citizenEngagement",
			eventType: "actionEvent"
		},
		then: {
			actionTarget: "slack_url",
			actionSchema: "{\"type\":\"sendSlackMessage\",\"properties\":{\"channel\":\"iflux\",\"message\":\"{{ properties.user }} did an action ({{ properties.type }}) on issue ({{ properties.issueId }}) {{ properties.issue }}. The reason: {{ properties.reason }}. The action was performed on {{ properties.date }}.\"}}"
		}
	},

	"SC-CE-AE-GLOBAL-METRICS": {
		description: "Update metrics globally on metrics action target.",
		reference: "SC-CE-AE-GLOBAL-METRICS",
		if: {
			eventSource: "smartCity/citizenEngagement",
			eventType: "actionEvent"
		},
		then: {
			actionTarget: "metrics_url",
			actionSchema: "{\"type\":\"updateMetric\",\"properties\":{\"metric\":\"ch.heigvd.ptl.sc.ce.{{properties.type}}\",\"timestamp\":\"{{timestamp}}\"}}"
		}
	},

	"SC-CE-AE-ISSUE-METRICS": {
		description: "Update metrics for an issue on metrics action target.",
		reference: "SC-CE-AE-ISSUE-METRICS",
		if: {
			eventSource: "smartCity/citizenEngagement",
			eventType: "actionEvent"
		},
		then: {
			actionTarget: "metrics_url",
			actionSchema: "{\"type\":\"updateMetric\",\"properties\":{\"metric\":\"ch.heigvd.ptl.sc.ce.{{properties.issueId}}.{{properties.type}}\",\"timestamp\":\"{{timestamp}}\"}}"
		}
	},

	"SC-CE-IC-SLACK": {
		description: "Send text notification to slack on issue creation.",
		reference: "SC-CE-IC-SLACK",
		if: {
			eventSource: "smartCity/citizenEngagement",
			eventType: "issueCreated"
		},
		then: {
			actionTarget: "slack_url",
			actionSchema: "{\"type\":\"sendSlackMessage\",\"properties\":{\"channel\":\"iflux\",\"message\":\"{{ properties.creator }} submitted an issue [{{ properties.issueId }}] on {{ properties.date }}. The issue concern: {{ properties.description }} and is situated at {{ properties.where }}.\"}}"
		}
	},

	"SC-CE-IC-METRICS": {
		description: "Update metrics globally on issue creation.",
		reference: "SC-CE-IC-METRICS",
		if: {
			eventSource: "smartCity/citizenEngagement",
			eventType: "issueCreated"
		},
		then: {
			actionTarget: "metrics_url",
			actionSchema: "{\"type\":\"updateMetric\",\"properties\":{\"metric\":\"ch.heigvd.ptl.sc.ce.issueCreated\",\"timestamp\":\"{{timestamp}}\"}}"
		}
	},

	"DEMO-SLACK": {
		description: "Send notifications to slack",
		reference: "DEMO-SLACK",
		if: {
			eventSource: "docker/slack",
			eventType: "dockerEvent"
		},
		then: {
			actionTarget: "slack_url",
			actionSchema: "{\"type\":\"sendSlackMessage\",\"properties\":{\"message\":\"There we go! This is a message from the amazing Docker Infra! {{ properties.custom }}\",\"channel\":\"iflux\"}}"
		}
	},

	"DEMO-METRICS": {
		description: "Slack Metrics",
		reference: "DEMO-METRICS",
		if: {
			eventSource: "docker/slack",
			eventType: "dockerEvent"
		},
		then: {
			actionTarget: "metrics_url",
			actionSchema: "{\"type\":\"updateMetric\",\"properties\":{\"metric\":\"ch.heigvd.ptl.slack.messages\",\"timestamp\":\"{{ timestamp }}\"}}"
		}
	}
}

scenario.step('configure base URL', function() {
	return this.configure({
		baseUrl: this.param('iflux_url')
	});
});

_.each(rules, function(rule, ref) {
	scenario.step('retrieve rule: ' + ref, function() {
		return this.get({
			url: '/rules',
			qs: {
				reference: ref
			}
		});
	});

	scenario.step('configure rule: ' + ref, function(response) {
		var retrievedRules = response.body;

		var rule = rules[ref];

		rule.then.actionTarget = this.param(rule.then.actionTarget);

		console.log(retrievedRules);

		if (retrievedRules.length == 1) {
			return this.patch({
				url: '/rules/' + retrievedRules[0].id,
				body: {
					enabled: true,
					then: {
						actionTarget: rule.then.actionTarget
					}
				}
			});
		}
		else if (retrievedRules.length == 0) {
			console.log(rule);
			return this.post({
				url: '/rules',
				body: rule
			});
		}
		else {
			throw new Error('More than one rule exist for rule: ' + ref);
		}
	});
});

module.exports = scenario;