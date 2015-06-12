# iflux-docker

> A complete infrastructure for iFLUX and the related demo.

## Board

[![Stories in Backlog](https://badge.waffle.io/SoftEng-HEIGVD/iflux-docker.svg?label=backlog&title=Backlog)](http://waffle.io/SoftEng-HEIGVD/iflux-docker)
[![Stories in Ready](https://badge.waffle.io/SoftEng-HEIGVD/iflux-docker.svg?label=ready&title=Ready)](http://waffle.io/SoftEng-HEIGVD/iflux-docker)
[![Stories in In Progress](https://badge.waffle.io/SoftEng-HEIGVD/iflux-docker.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/SoftEng-HEIGVD/iflux-docker)
[![Stories in In Done](https://badge.waffle.io/SoftEng-HEIGVD/iflux-docker.svg?label=done&title=Done)](http://waffle.io/SoftEng-HEIGVD/iflux-docker)

## Installation

Install:

## First option
1. [Docker](http://docs.docker.com/installation/mac/)
2. [Docker Compose](http://docs.docker.com/compose/install/)

## Second option
1. [Vagrant](http://www.vagrantup.com/downloads)

## Setup

Create the file `.env` in the root directory of the project. This file will not be commited. The content is the following:

```bash
# To enable/disable Slack integration
ENABLE_SLACK=<true|false>

# To force the applications using the docker ready configurations
NODE_ENV=docker

# Private secret for JWT management in iFLUX Server
JWT_SECRET=<generateUniqueLongAlphaNumString>

# Kafka configuration for iFLUX
KAFKA_ADVERTISED_HOST_NAME=<VM IP>
KAFKA_ADVERTISED_PORT=9092

# Elastic search configuration for iFLUX
ELASTICSEARCH_ENDPOINT=http://<VM IP>:9200

# The database data for iFLUX
DB_NAME=ifluxsrv
DB_USER=ifluxsrv
DB_PASS=ifluxsrv```
```

## First Option - Boot2Docker

Run the following commands:

```bash
$> cd <rootDirectoryOfTheProject>

# The first time
$> boot2docker init

# Everytime you want the VM to be up
$> boot2docker up

# Setup your environment
$> boot2docker shellinit

# Retrieve the external IP of the VM
$> boot2docker ip

# REMARK: Replace the relevant data into the .env

# Run the containers in the background (choose one of the two components)
$> docker-compose up -d <rp | rplight>

# Check everything is up and running
$> docker ps
```

# Option 2 - Vagrant

```bash
$> cd <rootDirectoryOfTheProject>

# Take your patience !
$> vagrant up
```

## Use it

Once everything is running, you will be able to access different services:

| Service             | Url                            | Repository |
| ------------------- | ------------------------------ | ---------- |
| iFLUX Gateway       | http://{IP}:3000/api/v1/events | [iflux-api-gateway-node](https://github.com/SoftEng-HEIGVD/iflux-api-gateway-node)
| iFLUX Server        | http://{IP}:3000/api/v1/*      | [iflux-server-node](https://github.com/SoftEng-HEIGVD/iflux-server-node)
| iFLUX Slack Gateway | http://{IP}:3000/slack         | [iflux-slack-gateway](https://github.com/SoftEng-HEIGVD/iflux-slack-gateway)
| iFLUX Metrics       | http://{IP}:3000/metrics       | [iflux-metrics-action-target](https://github.com/SoftEng-HEIGVD/iflux-metrics-action-target)
| iFLUX MapBox Viewer | http://{IP}:3000/viewer        | [iflux-mapbox-viewer](https://github.com/SoftEng-HEIGVD/iflux-mapbox-viewer)
| Citizen Engagement  | http://{IP}:3000/citizen/api   | [Teaching-HEIGVD-CM_WEBS-2015-Labo-Express-Impl](https://github.com/SoftEng-HEIGVD/Teaching-HEIGVD-CM_WEBS-2015-Labo-Express-Impl)
| Publibike poller    | n/a                            | [iflux-publibike-event-source](https://github.com/SoftEng-HEIGVD/iflux-publibike-event-source)
| iFLUX API Doc       | http://{IP}:3000/doc           | [iflux-apidoc](https://github.com/SoftEng-HEIGVD/iflux-apidoc)
| Kibana              | http://{IP}:3000/kibana        | [Project](https://www.elastic.co/products/kibana)
| Elasticsearch       | {IP}:9200/9300                 | [Project](https://www.elastic.co/products/elasticsearch)
| Kafka               | {IP}:9092                      | [Project](http://kafka.apache.org/)
| Zookeeper           | {IP}:2181                      | [Project](https://zookeeper.apache.org/)
| Postgresql          | {IP}:5432                      | [Product](http://www.postgresql.org/)
| Mongo DB            | mongo://{IP}:27017             | [Product](http://www.mongodb.org/)

### iFLUX Gateway

This component will receive the events and forward them to iFLUX Server through [Kafka](http://kafka.apache.org/).

### iFLUX Server

This node is the heart of the system. It receives the `events` and triggers the `actions`.

### iFLUX Slack Gateway

Integration with [Slack](https://slack.com/) to send text messages on a specific channel.

### iFLUX Metrics

Collect and store metrics in a Mongo DB.

### iFLUX MapBox Viewer

Demo application to show visual representation of the `actions` triggered from the `events` received on `iFLUX` server from
sources like `Citizen Engagement` app or `Publibike` app.

### Citizen Engagement

Demonstration backend done in the context of HEIG-VD course. Citizen Engagement offers an API to create new issues to assign
to users. An issue consist of a localized problem located in a city. Take a look to the [API documentation](https://polar-brook-7624.herokuapp.com).

### Publibike poller

Demonstration application to collect data about the [Publibike](https://www.publibike.ch).

### API Doc

Static content to show the documentation of the iFLUX API for the iFLUX Server and iFLUX Gateway.

#### Citizen Simulator

An [API Copilot](https://github.com/lotaris/api-copilot) script to simulate relative natural data occurring in `Citizen Engagement` app.

## Contributing

* [Fork](https://help.github.com/articles/fork-a-repo)
* Create a topic branch - `git checkout -b feature`
* Push to your branch - `git push origin feature`
* Create a [pull request](http://help.github.com/pull-requests/) from your branch

Please add a changelog entry with your name for new features and bug fixes.

## License

Probe Dock is licensed under the [GNU General Public License v3](http://www.gnu.org/licenses/gpl.html).
See [LICENSE.txt](LICENSE.txt) for the full license.
