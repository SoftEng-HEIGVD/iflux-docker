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
NODE_ENV=docker

###########################
# Docker Compose Specific
###########################
KAFKA_ADVERTISED_HOST_NAME=<Boot2Docker IP>
KAFKA_ADVERTISED_PORT=9092

################
# Commons
################
# Used by: publibike, starter
COMMON_IFLUX_API_URL=http://<Boot2Docker IP>:3000/api/v1

# Used by: slack, starter
COMMON_SLACK_ENABLE=false

################
# Citizen
################
CITIZEN_ACTION_TYPE_ISSUE=http://<Boot2Docker IP>:3000/schemas/eventTypes/citizenIssue
CITIZEN_ACTION_TYPE_STATUS=http://<Boot2Docker IP>:3000/schemas/eventTypes/citizenStatus
CITIZEN_ACTION_TYPE_ACTION=http://<Boot2Docker IP>:3000/schemas/eventTypes/citizenAction

####################
# Citizen Simulator
####################
CITIZEN_SERVER_URL=http://<Boot2Docker IP>:3000/citizen

################
# IFLUX
################
IFLUX_SERVER_JWT_SECRET=<randomStringToBeKeptSecret>

# Database info
IFLUX_PG_DB_NAME=ifluxsrv
IFLUX_PG_DB_USER=ifluxsrv
IFLUX_PG_DB_PASS=ifluxsrv

################
# IFLUX STARTER
################
IFLUX_SCHEMAS_URL=http://<Boot2Docker IP>:3000/schemas
CITIZEN_URL=http://<Boot2Docker IP>:3000/citizen
METRICS_URL=http://<Boot2Docker IP>:3000/metrics
SLACK_GATEWAY_URL=http://<Boot2Docker IP>:3000/slack
VIEWBOX_URL=http://<Boot2Docker IP>:3000/view

# Base data for iFLUX setup
IFLUX_ADMIN_USER=admin@iflux.io
IFLUX_ADMIN_PASSWORD=<anySecretPassword>

# Token to configure the iFLUX Slack Gateway
SLACK_GATEWAY_IFLUX_BOT_TOKEN=<ifluxSlackToken>

############
# Metrics
############
METRICS_ACTION_TYPE=http://<Boot2Docker IP>:3000/schemas/actionTypes/updateMetric

############
# Publibike
############
# Uncomment this var to customize the polling interval
# PUBLIBIKE_POLL_INTERVAL=1234

PUBLIBIKE_EVENT_TYPE=http://<Boot2Docker IP>:3000/schemas/eventTypes/publibikeMovement

###########
# Slack
###########
SLACK_ACTION_TYPE=http://<Boot2Docker IP>:3000/schemas/actionTypes/slackMessageSending

###########
# ViewBox
###########
VIEWBOX_ACTION_TYPE=http://<Boot2Docker IP>:3000/schemas/actionTypes/viewMarker
```

### Description of the variables

#### Standard

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| NODE_ENV                   | Define the Docker environment to let each application to be configured in the right mode. |

#### Docker compose related

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| KAFKA_ADVERTISED_HOST_NAME | The IP where Kafka will be exposed outside (Boot2Docker IP, Vagrant VM IP, ...) |
| KAFKA_ADVERTISED_PORT      | Default port is 9092. |

#### Commons

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| COMMON_IFLUX_API_URL       | Should be the URL to post events on iFLUX. |
| COMMON_SLACK_ENABLE        | Enable/Disable Slack system. |

#### Citizen Engagement

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| CITIZEN_ACTION_TYPE_ISSUE  | Define the issue creation event type. Must be unique. | 
| CITIZEN_ACTION_TYPE_STATUS | Define the issue status changes event type. Must be unique. |
| CITIZEN_ACTION_TYPE_ACTION | Define the issue actions performed type. Must be unique. |

#### Citizen Simulator

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| CITIZEN_SERVER_URL         | Should be the URL to contact the Citizen Engagement API. |

#### iFLUX

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| IFLUX_SERVER_JWT_SECRET    | Must be a random string that will be used to cipher the JSON Web Tokens. |
| IFLUX_PG_DB_NAME           | The database name. |
| IFLUX_PG_DB_USER           | The database user name. |
| IFLUX_PG_DB_PASS           | The database user password. |

#### iFLUX Starter

| Name                          | Description                               |
| ----------------------------- | ----------------------------------------- |
| IFLUX_ADMIN_USER              | To define the admin user name. |
| IFLUX_ADMIN_PASSWORD          | To define the admin password. |
| IFLUX_SCHEMAS_URL             | To define the base path for the event and action types. Take care the action and event types must be the same than the one configured in each project (citizen, metrics, slack and viewbox). |
| CITIZEN_URL                   | The URL to contact the Citizen Engagement event source. |
| METRICS_URL                   | The URL to contact the Metrics action target. |
| SLACK_GATEWAY_URL             | The URL to contact Slack action target. |
| VIEWBOX_URL                   | The URL to contact ViewBox action target. |
| SLACK_GATEWAY_iFLUX_BOT_TOKEN | The iFLUX Bot Token that is used to connect to Slack. |

#### Metrics

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| METRICS_ACTION_TYPE        | Define the metrics action type. Must be unique. | 

#### Publibike

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| COMMON_IFLUX_API_URL       | Should be the URL to post events on iFLUX. |
| PUBLIBIKE_EVENT_TYPE       | Define the publibike movement event type. Must be unique. | 
| PUBLIBIKE_POLL_INTERVAL    | `optional`: Define the delay between to call to the Publibike API. |

#### Slack

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| SLACK_ACTION_TYPE          | Define the slack message type. Must be unique. |

#### Slack

| Name                       | Description                               |
| -------------------------- | ----------------------------------------- |
| VIEWBOX_ACTION_TYPE        | Define the marker action type. Must be unique. |

## First option - Boot2Docker

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

######################################################
# <START> The first time you do the setup and the run
######################################################
# REMARK: Replace the relevant data into the .env

# Retrieve all the images used by iflux (take time, go have a coffee)
$> docker-compose pull 
######################################################
# <END> The first time you do the setup and the run
######################################################

# Start the containers (default is rplight if no args provided to start)
$> ./start.sh <rp|rplight>
```

# Second option - Vagrant

```bash
$> cd <rootDirectoryOfTheProject>

# Take your patience !
$> vagrant up
```

# Third option - Native Linux system

> You should be sure that SELinux will not interfer in your setup. The path `/iflux` on your host must be accessible by Docker.

```bash
$> cd <rootDirectoryOfTheProject>

######################################################
# <START> The first time you do the setup and the run
######################################################
# REMARK: Replace the relevant data into the .env

# Retrieve all the images used by iflux (take time, go have a coffee)
$> docker-compose pull 
######################################################
# <END> The first time you do the setup and the run
######################################################

# Start the containers (default is rplight if no args provided to start)
$> ./start.sh <rp|rplight>
```

## Cleanup

Sometimes, you would like to clean all the running containers and start again with a fresh setup. Several options are avaible.

### Clean running containers

```bash
$> docker rm -f `docker ps -qa`
```

> **CAUTION**: Be careful, using that method can corrupt your data. So, use that command only for dev purpose.

### Clean data

```bash
$> (sudo) rm -rf /iflux/*
```

> If you use `Vagrant` or `Boot2Docker`, you need to connect to the VM to do the command.

```bash
$> boot2docker ssh
boot2docker> sudo rm -rf /iflux/*
```

```bash
$> vagrant ssh
vagrant> sudo rm -rf /iflux/*
```

## Use it

Once everything is running, you will be able to access different services:

| Service             | Url                            | Mode        | Repository |
| ------------------- | ------------------------------ |:-----------:| ---------- |
| iFLUX Gateway       | http://{IP}:3000/api/v1/events | rp, rplight | [iflux-api-gateway-node](https://github.com/SoftEng-HEIGVD/iflux-api-gateway-node)
| iFLUX Server        | http://{IP}:3000/api/v1/*      | rp, rplight | [iflux-server-node](https://github.com/SoftEng-HEIGVD/iflux-server-node)
| iFLUX Slack Gateway | http://{IP}:3000/slack         | rp          | [iflux-slack-gateway](https://github.com/SoftEng-HEIGVD/iflux-slack-gateway)
| iFLUX Metrics       | http://{IP}:3000/metrics       | rp          | [iflux-metrics-action-target](https://github.com/SoftEng-HEIGVD/iflux-metrics-action-target)
| iFLUX MapBox Viewer | http://{IP}:3000/viewer        | rp          | [iflux-mapbox-viewer](https://github.com/SoftEng-HEIGVD/iflux-mapbox-viewer)
| Citizen Engagement  | http://{IP}:3000/citizen/api   | rp          | [Teaching-HEIGVD-CM_WEBS-2015-Labo-Express-Impl](https://github.com/SoftEng-HEIGVD/Teaching-HEIGVD-CM_WEBS-2015-Labo-Express-Impl)
| Publibike poller    | n/a                            | rp          | [iflux-publibike-event-source](https://github.com/SoftEng-HEIGVD/iflux-publibike-event-source)
| iFLUX API Doc       | http://{IP}:3000/doc           | rp, rplight | [iflux-apidoc](https://github.com/SoftEng-HEIGVD/iflux-apidoc)
| Kibana              | http://{IP}:3000/kibana        | rp, rplight | [Project](https://www.elastic.co/products/kibana)
| Elasticsearch       | {IP}:9200/9300                 | rp, rplight | [Project](https://www.elastic.co/products/elasticsearch)
| Kafka               | {IP}:9092                      | rp, rplight | [Project](http://kafka.apache.org/)
| Zookeeper           | {IP}:2181                      | rp, rplight | [Project](https://zookeeper.apache.org/)
| Postgresql          | {IP}:5432                      | rp, rplight | [Product](http://www.postgresql.org/)
| Mongo DB            | mongo://{IP}:27017             | rp          | [Product](http://www.mongodb.org/)

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
