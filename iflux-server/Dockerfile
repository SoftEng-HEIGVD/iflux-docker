FROM node:0.12.0-wheezy
MAINTAINER Laurent Prevost <laurent.prevost@heig-vd.ch>

COPY code /nodejs/app

RUN cd /nodejs/app && \
		npm install

EXPOSE 3000

WORKDIR /nodejs/app

CMD ["npm", "start"]