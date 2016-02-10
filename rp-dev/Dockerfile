FROM nginx
MAINTAINER laurent.prevost@heig-vd.ch

COPY nginx.conf /etc/nginx/nginx.conf

COPY start.sh /nginx/start.sh

RUN chown root:root /nginx/start.sh && chmod +x /nginx/start.sh

CMD /nginx/start.sh