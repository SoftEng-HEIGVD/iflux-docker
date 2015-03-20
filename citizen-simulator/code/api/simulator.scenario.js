var
	_ = require('underscore'),
	dotenv = require('dotenv'),
	copilot = require('api-copilot');

if (process.env.NODE_ENV != 'docker') {
	dotenv.load();
}

function random (low, high) {
	return Math.random() * (high - low) + low;
}

function randomInt (low, high) {
	return Math.floor(Math.random() * (high - low) + low);
}

// TODO: NOT USED YET!
//function randomDate(start, end) {
//	return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
//}

var Queue = function Queue() {
	this.storage = [];
	this.size = 0;
};

Queue.prototype.pushRandom = function(item) {
	if (this.size > 1) {
		var sliceIdx = randomInt(0, this.size);

		var left = this.storage.slice(0, sliceIdx);
		var right = this.storage.slice(sliceIdx);

		this.storage = left.concat([item], right);
	}
	else {
		this.storage.push(item)
	}
	this.size = this.storage.length;
}

Queue.prototype.push = function(item) {
	this.storage.push(item)
	this.size = this.storage.length;
}

Queue.prototype.pop = function() {
	if (this.size > 0) {
		var item = this.storage[0];
		this.storage = this.storage.slice(1);
		return item;
	}
}

var TICK_DELAY_MIN = 2000;
var TICK_DELAY_MAX = 10000;

var NB_CITIZEN = 15;

var staffRaw = [
	{
		firstname: 'Alain',
		lastname: 'Desportes',
		phone: '+41791234567',
		roles: [ 'staff' ]
	},
	{
		firstname: 'Romain',
		lastname: 'Dupont',
		phone: '+41787654321',
		roles: [ 'staff' ]
	},
	{
		firstname: 'Alexandre',
		lastname: 'Da Silva',
		phone: '+41791234567',
		roles: [ 'staff' ]
	}
];

var issueTypesRaw = [
	{ code: "bsl", name: "broken streetlight", description: "Light is broken"},
	{ code: "dcr", name: "dangerous crossroad", description: "Devil road"},
	{ code: "grf", name: "graffiti", description: "Youngs are evil"}
];

var FIRST_NAMES = [ 'Alfred', 'Henri', 'Romain', 'Benoit', 'Baptiste', 'Gabriel', 'Valentin', 'Guy', 'Pierre', 'Nico' ];
var LAST_NAMES = [ 'Dutoit', 'Ducroc', 'Terzidis', 'Combes', 'Tartanpion', 'Favre', 'Cornuz', 'Bolomay' ];

var ACTION_WORKFLOWS = {
	short_resolve: [ 'resolve' ],
	medium_resolve: [ 'ack', 'resolve' ],
	long_resolve: [ 'ack', 'start', 'resolve' ],
	long_reject: [ 'ack', 'start', 'reject' ],
	long_pending: [ 'ack', 'start' ]
};

var ISSUE_TYPE_IMAGES = {
	bsl: [
		'http://cdn2.hubspot.net/hub/372659/file-647474867-jpg/blog-files/lightpole2.jpg?t=1424816062643',
		'http://seeclickfix.com/files/issue_images/0008/5245/2012-08-01_10.07.37.jpg',
		'http://www.jolind.com/swenjohncom/Images/Cuba/INFRO2.JPG'
	],
	dcr: [
		'http://www.downvids.net/video/bestimages/img-dangerous-crossroad-916.jpg',
		'https://departmentfortransport.files.wordpress.com/2014/02/bb2-vzyimaaw3cx-large.jpg',
		'http://i.imgur.com/OkwKGNh.jpg'
	],
	grf: [
		'http://all-that-is-interesting.com/wordpress/wp-content/uploads/2013/02/Moss-Graffiti-And-Regular-Graffiti.jpg',
		'http://fc01.deviantart.net/fs70/f/2012/088/0/e/surreal__graffiti_alley_by_darkphoenix36-d4ucmlj.jpg',
		'http://cdn.wonderfulengineering.com/wp-content/uploads/2014/09/graffiti-wallpaper-8.jpg'
	]
};

var DESCRIPTIONS = {
	bsl: [
		{ desc: "There is a broken light at the corner.", flow: 'long_resolve' },
		{ desc: "The street light is blinking. I cannot sleep at night.", flow: 'long_pending' },
		{ desc: "Some young people thrown stones to the light aside of the road.", flow: 'medium_resolve' },
		{ desc: "Why this street light is red. It must be yellow.", flow: 'long_reject' }
	],
	dcr: [
		{ desc: "The car speed at this crossroad is really to high. I cannot let my children cross the road alone.", flow: 'long_pending' },
		{ desc: "There is no pedestrian crossing there. I do not want to walk 100 meters to find one.", flow: 'short_resolve' },
		{ desc: "Why there is no round about there", flow: 'long_reject' }
	],
	grf: [
		{ desc: "Again! My shopwindow is full of painting:", flow: 'short_resolve' },
		{ desc: "The station is full of graffiti. You should clean that.", flow: 'long_reject' }
	]
};

// TODO: NOT USED YET!
//var TAGS = {
//	bsl: [ 'street', 'light', 'broken', 'off' ],
//	dcr: [ 'roundabout', 'safety', 'marking', 'pedestrian', 'crossing' ],
//	grf: [ 'painting', 'wall', 'shopwindow' ]
//};

var STAFF = [];
var CITIZEN = null;
var ISSUE_TYPES = null;
var ISSUES = {};

var MIN_LAT = 46.766129;
var MAX_LAT = 46.784234;
var MIN_LNG = 6.622009;
var MAX_LNG = 6.651878;

var STEP_QUEUE = new Queue();

// TODO: NOT USED YET!
//function generateTags(issueTypeCode) {
//	var data = [];
//
//	for (var i = 0; i < randomInt(1, 5); i++) {
//		data.push(TAGS[issueTypeCode][randomInt(0, TAGS[issueTypeCode].length)]);
//	}
//
//	return _.uniq(data);
//}

function generateIssue() {
	var issueType = ISSUE_TYPES[randomInt(0, ISSUE_TYPES.length)];

	var description = DESCRIPTIONS[issueType.code][randomInt(0, DESCRIPTIONS[issueType.code].length)];

	return {
		flow: description.flow,
		owner: CITIZEN[randomInt(0, CITIZEN.length)],
		issue : {
			description: description.desc,
			lng: random(MIN_LNG, MAX_LNG),
			lat: random(MIN_LAT, MAX_LAT),
			imageUrl: ISSUE_TYPE_IMAGES[issueType.code][randomInt(0, ISSUE_TYPE_IMAGES[issueType.code].length)],
			issueTypeId: issueType.id
		}
	};
}

function generateAssignAction() {
	return {
		userId: STAFF[randomInt(0, STAFF.length)].id,
		action: {
			type: 'assign',
			payload: {
				assigneeId: STAFF[randomInt(0, STAFF.length)].id
			}
		}
	};
}

function generateAction(actionType) {
	return {
		type: actionType,
	};
}


var scenario = new copilot.Scenario({
  name: 'Simulate Citizen Engagement activity',
	summary: 'Try to make a realistic behavior of citizen engagement application',
	defaultRequestOptions: {
		json: true
	}
});

scenario.addParam('citizen_url', {
	default: process.env.CITIZEN_SERVER_URL || 'http://citizen:3000'
});

scenario.step('configure base URL', function() {
	return this.configure({
		baseUrl: this.param('citizen_url')
	});
});

scenario.step('clear the citizen engagement application', function() {
	this.delete({
		url: '/api/data/drop',
		expect: { statusCode: 204 }
	})
});

_.each(staffRaw, function(employee) {
	scenario
		.step('create staff member: ' + employee.firstname + ' ' + employee.lastname, function() {
			return this.post({
				url: '/api/users',
				body: employee,
				expect: { statusCode: 201 }
			});
		})
		.step('enriched staff data for:' + employee.firstname + ' ' + employee.lastname, function(response) {
			STAFF.push(response.body);
		});
});

var takenNames = [];
var rawCitizen = [];

for (var i = 0; i < 15; i++) {
	var firstname;
	var lastname;
	var name;

	// Make sure each first and last name are unique
	for (;;) {
		firstname = FIRST_NAMES[randomInt(0, FIRST_NAMES.length)];
		lastname = LAST_NAMES[randomInt(0, LAST_NAMES.length)];
		name = (firstname + ' ' + lastname).toLowerCase();

		if (!_.contains(takenNames, name)) {
			takenNames.push(name);
			break;
		}
	}

	rawCitizen.push({
		firstname: firstname,
		lastname: lastname,
		name: name,
		phone: '+' + randomInt(1000000, 10000000),
		roles: [ 'citizen' ]
	});
}

scenario
	.step('Create ' + NB_CITIZEN + ' citizen', function() {
		var requests = _.map(rawCitizen, function(citizen) {
			return this.post({
				url: '/api/users',
				body: citizen,
				expect: { statusCode: 201 }
			});
		}, this);

		return this.all(requests);
	})
	.step('Collects the citizen created', function(responses) {
		CITIZEN = _.pluck(responses, 'body');
	});

scenario
	.step('Create ' + issueTypesRaw.length + ' issue types', function() {
		var requests = _.map(issueTypesRaw, function(issueType) {
			return this.post({
				url: '/api/issueTypes',
				headers: {
					'x-user-id': STAFF[0].id
				},
				body: issueType,
				expect: { statusCode: 201 }
			});
		}, this);

		return this.all(requests);
	})
	.step('Collects the issue types created', function(responses) {
		ISSUE_TYPES = _.pluck(responses, 'body');
	});

function createAction(args) {
	scenario
		.step('Action [' + args.actionType + '] for issue [' + args.issueId + ']', function() {
			return this.post({
				url: '/api/issues/' + args.issueId + '/actions',
				headers: {
					'x-user-id': args.assigneeId
				},
				body: generateAction(args.actionType),
				expect: { statusCode: 200 }
			});
		});
}

var NB_ISSUES = 1;

function createAndAssignIssue() {
	scenario
		.step('Create an issue: ' + NB_ISSUES, function () {
			var issue = generateIssue();

			var requests = [];

			requests.push(
				this.post({
					url: '/api/issues',
					headers: {
						'x-user-id': issue.owner.id
					},
					body: issue.issue,
					expect: { statusCode: 201 }
				})
			);

			requests.push(
				this.post({
					url: '/api/data/ping',
					body: {
						flow: issue.flow
					},
					expect: { statusCode: 200 }
				})
			);

			return this.all(requests);
		})
		.step('Collect issue created: ' + NB_ISSUES, function(responses) {
			var issue = {
				issue: responses[0].body,
				flow: responses[1].body.flow
			};

			ISSUES[issue.issue.id] = issue;

			return issue;
		})
		.step('Assign created issue: ' + NB_ISSUES, function(issue) {
			var assignAction = generateAssignAction();

			return this.post({
				url: '/api/issues/' + issue.issue.id + '/actions',
				headers: {
					'x-user-id': assignAction.userId
				},
				body: assignAction.action,
				expect: { statusCode: 200 }
			});
		})
		.step('Collect issue updated after assignement: ' + NB_ISSUES, function(response) {
			var issue = response.body;

			ISSUES[issue.id].issue = issue;

			_.each(ACTION_WORKFLOWS[ISSUES[issue.id].flow], function(actionType) {
				console.log("Prepare action: %s for issue %s", actionType, issue.id);

				STEP_QUEUE.push({
					fn: createAction,
					args: {
						actionType: actionType,
						issueId: issue.id,
						assigneeId: issue.assignee.id
					}
				});
			});

			STEP_QUEUE.pushRandom({ fn: createAndAssignIssue });
		});

	NB_ISSUES++;

	return;
};

var NB_TICKS = 1;

function tick() {
	scenario
		.step('Process tick: ' + NB_TICKS, function() {
			var step = STEP_QUEUE.pop();

			if (step) {
				if (_.isUndefined(step.args)) {
					step.fn()
				}
				else {
					step.fn(step.args);
				}
			}

			var wait = randomInt(TICK_DELAY_MIN, TICK_DELAY_MAX);

			console.log("Will wait %sms", wait);

			var deferred = this.defer();

			setTimeout(function() {
				tick();
				deferred.resolve();
			}, wait);

			return deferred.promise;
		});

	NB_TICKS++;
};

STEP_QUEUE.pushRandom({ fn: createAndAssignIssue });

tick();

module.exports = scenario;