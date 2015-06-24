FROM debian:wheezy

# MongoDB user
RUN groupadd -r mongodb \
	&& useradd -r -g mongodb mongodb \
	&& mkdir -p /data/db/mongo \
	&& chown -R mongodb:mongodb /data/db/mongo

RUN cd /data && mkdir slack citizen viewbox metrics publibike

# Add iFLUX Slack user
RUN useradd -m -r -U ifluxslack -u 1111 && chown -R ifluxslack:ifluxslack /data/slack

# Add iFLUX Citizen
RUN useradd -m -r -U citizen -u 1112 && chown -R citizen:citizen /data/citizen

# Add iFLUX Viewbox
RUN useradd -m -r -U viewbox -u 1113 && chown -R viewbox:viewbox /data/viewbox

# Add iFLUX Metrics
RUN useradd -m -r -U metrics -u 1114 && chown -R metrics:metrics /data/metrics

# Add iFLUX Publibike
RUN useradd -m -r -U publibike -u 1115 && chown -R publibike:publibike /data/publibike

# Add iFLUX Publibike
RUN useradd -m -r -U ifluxfe -u 1116 && chown -R ifluxfe:ifluxfe /data/ifluxfe

# All for the last setup
ADD . /datasetup
RUN chmod +x /datasetup/setup.sh
WORKDIR /datasetup

CMD ["./setup.sh"]