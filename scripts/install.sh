#!/bin/bash

echo "Installing Docker and Docker Compose"
sudo apt-get update $ sudo apt-get install wget
wget -qO- https://get.docker.com/ | sh
echo "Docker installed"

echo "Installing Docker Compose"
export ARCH=$(uname -m)
export DIST=$(uname -s)
curl -L "https://github.com/docker/compose/releases/download/1.2.0/docker-compose-$DIST-$ARCH" > /usr/local/bin/docker-compose;
chmod +x /usr/local/bin/docker-compose
echo "Docker Compose installed"

echo "Download the different images"
cd $1
docker-compose pull
