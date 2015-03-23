FROM ifluxdocker_ifluxsrv
MAINTAINER Laurent Prevost <laurent.prevost@heig-vd.ch>

USER root

RUN npm install -g grunt-cli

USER iflux

CMD ["grunt", "migrate:all"]