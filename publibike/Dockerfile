FROM node:0.12.0-wheezy
MAINTAINER Laurent Prevost <laurent.prevost@heig-vd.ch>

# For later use when bower will be reintroduced
# RUN npm install -g bower

# See: http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
ADD code/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /nodejs/publibike && cp -a /tmp/node_modules /nodejs/publibike

ADD code /nodejs/publibike

RUN useradd -m -r -U publibike \
	&& chown -R publibike:publibike /nodejs/publibike

USER publibike

WORKDIR /nodejs/publibike

CMD ["npm", "start"]