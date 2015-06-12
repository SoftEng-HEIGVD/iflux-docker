#!/bin/bash

mkdir -p $1
cp /home/vagrant/mnt/start.sh $1/start.sh
cp -r /home/vagrant/mnt/db $1

echo 'Prepare env file'
cp /home/vagrant/mnt/.env $1/.env
sed -i -e "s/\([[:digit:]]\{1,3\}\.\)\{3\}[[:digit:]]\{1,3\}/$2/g" $1/.env
sed -i -e "s/:.*:/:\\/\\/$2:/" $1/.env

echo 'Prepare compose file'
cp /home/vagrant/mnt/docker-compose.yml $1/docker-compose.yml
sed -i -e "s/build: /build: \\/home\\/vagrant\\/mnt\\//" $1/docker-compose.yml

echo 'iFLUX Docker config ready'
