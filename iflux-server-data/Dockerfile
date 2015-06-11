FROM debian:wheezy

RUN groupadd -r mongodb \
	&& useradd -r -g mongodb mongodb \
	&& mkdir -p /data/db \
	&& chown -R mongodb:mongodb /data \
	&& useradd -m -r -U ifluxslack -u 1111 \
	&& mkdir -p /data/slack \
	&& chown -R ifluxslack:ifluxslack /data/slack

CMD /bin/bash