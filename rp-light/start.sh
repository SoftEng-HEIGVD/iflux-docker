#!/bin/bash

sed -i "s/<doc>/${DOC_PORT_4000_TCP_ADDR}:${DOC_PORT_4000_TCP_PORT}/" /etc/nginx/nginx.conf
sed -i "s/<fe>/${FE_PORT_3000_TCP_ADDR}:${FE_PORT_3000_TCP_PORT}/" /etc/nginx/nginx.conf
sed -i "s/<gateway>/${GATEWAY_PORT_3000_TCP_ADDR}:${GATEWAY_PORT_3000_TCP_PORT}/" /etc/nginx/nginx.conf
sed -i "s/<iflux>/${IFLUX_PORT_3000_TCP_ADDR}:${IFLUX_PORT_3000_TCP_PORT}/" /etc/nginx/nginx.conf
sed -i "s/<kibana>/${KIBANA_PORT_5601_TCP_ADDR}:${KIBANA_PORT_5601_TCP_PORT}/" /etc/nginx/nginx.conf

nginx