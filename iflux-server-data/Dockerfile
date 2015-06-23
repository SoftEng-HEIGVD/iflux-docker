FROM debian:wheezy

# MongoDB user
RUN groupadd -r mongodb \
	&& useradd -r -g mongodb mongodb \
	&& mkdir -p /data/db/mongo \
	&& chown -R mongodb:mongodb /data/db/mongo

RUN cd /data \
    && mkdir slack \
    && mkdir citizen \
    && mkdir viewbox \
    && mkdir publibike

# Add iFLUX Slack user
RUN useradd -m -r -U ifluxslack -u 1111 \
	&& chown -R ifluxslack:ifluxslack slack

# Add iFLUX Citizen
RUN useradd -m -r -U citizen -u 1112 \
	&& chown -R citizen:citizen citizen

# Add iFLUX Viewbox
RUN useradd -m -r -U viewbox -u 1113 \
	&& chown -R viewbox:viewbox viewbox

# Add iFLUX Metrics
RUN useradd -m -r -U metrics -u 1114 \
	&& chown -R metrics:metrics metrics

# Add iFLUX Publibike
RUN useradd -m -r -U publibike -u 1115 \
	&& chown -R metrics:publibike publibike

CMD /bin/bash