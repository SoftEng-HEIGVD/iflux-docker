FROM node:0.12.0-wheezy
MAINTAINER Laurent Prevost <laurent.prevost@heig-vd.ch>

# For later use when bower will be reintroduced
# RUN npm install -g bower

# See: http://bitjudo.com/blog/2014/03/13/building-efficient-dockerfiles-node-dot-js/
ADD code/package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /nodejs/iflux-slack && cp -a /tmp/node_modules /nodejs/iflux-slack

ADD code /nodejs/iflux-slack

RUN useradd -m -r -U iflux \
	&& chown -R iflux:iflux /nodejs/iflux-slack

USER iflux

WORKDIR /nodejs/iflux-slack

EXPOSE 3000

CMD ["npm", "start"]