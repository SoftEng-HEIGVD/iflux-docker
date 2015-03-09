FROM debian:wheezy

RUN groupadd -r mongodb \
	&& useradd -r -g mongodb mongodb \
	&& mkdir -p /data/db \
	&& chown -R mongodb:mongodb /data

CMD /bin/bash