#!/bin/bash

sed -i "s/<citizen>/${CITIZEN_PORT_3000_TCP_ADDR}:${CITIZEN_PORT_3000_TCP_PORT}/" /etc/nginx/nginx.conf
sed -i "s/<doc>/${DOC_PORT_4000_TCP_ADDR}:${DOC_PORT_4000_TCP_PORT}/" /etc/nginx/nginx.conf
sed -i "s/<gateway>/${GATEWAY_PORT_3000_TCP_ADDR}:${GATEWAY_PORT_3000_TCP_PORT}/" /etc/nginx/nginx.conf
sed -i "s/<iflux>/${IFLUX_PORT_3000_TCP_ADDR}:${IFLUX_PORT_3000_TCP_PORT}/" /etc/nginx/nginx.conf
sed -i "s/<kibana>/${KIBANA_PORT_5601_TCP_ADDR}:${KIBANA_PORT_5601_TCP_PORT}/" /etc/nginx/nginx.conf
sed -i "s/<metrics>/${METRICS_PORT_3000_TCP_ADDR}:${METRICS_PORT_3000_TCP_PORT}/" /etc/nginx/nginx.conf
sed -i "s/<slack>/${SLACK_PORT_3000_TCP_ADDR}:${SLACK_PORT_3000_TCP_PORT}/" /etc/nginx/nginx.conf
sed -i "s/<viewer>/${VIEWER_PORT_3000_TCP_ADDR}:${VIEWER_PORT_3000_TCP_PORT}/" /etc/nginx/nginx.conf

nginx