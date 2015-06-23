FROM debian:wheezy

# MongoDB user
RUN groupadd -r mongodb \
	&& useradd -r -g mongodb mongodb \
	&& mkdir -p /data/db/mongo \
	&& chown -R mongodb:mongodb /data/db/mongo \

# Add iFLUX Slack user
RUN useradd -m -r -U ifluxslack -u 1111 \
	&& mkdir -p /data/slack \
	&& chown -R ifluxslack:ifluxslack /data/slack

# Add iFLUX Citizen
RUN useradd -m -r -U citizen -u 1112 \
	&& mkdir -p /data/citizen \
	&& chown -R citizen:citizen /data/citizen

# Add iFLUX Viewbox
RUN useradd -m -r -U viewbox -u 1113 \
	&& mkdir -p /data/viewbox \
	&& chown -R viewbox:viewbox /data/viewbox

# Add iFLUX Metrics
RUN useradd -m -r -U metrics -u 1114 \
	&& mkdir -p /data/metrics \
	&& chown -R metrics:metrics /data/metrics

# Add iFLUX Publibike
RUN useradd -m -r -U publibike -u 1115 \
	&& mkdir -p /data/publibike \
	&& chown -R metrics:publibike /data/publibike


CMD /bin/bash