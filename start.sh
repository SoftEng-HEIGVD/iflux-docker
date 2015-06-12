#!/bin/bash

container=$1

if [ -z "$1" ]; then
    container='rplight'
fi

docker-compose run --rm postgresqlwait
docker-compose up -d $container
docker ps