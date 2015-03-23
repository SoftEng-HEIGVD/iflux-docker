# iflux-docker

> A complete infrastructure for iFLUX and the related demo.

## Installation

Install:

1. [Docker](http://docs.docker.com/installation/mac/)
2. [Docker Compose](http://docs.docker.com/compose/install/)
3. [Vagrant](http://www.vagrantup.com/downloads) (optional, no procedure documented yet)

## Setup

Run the following command to retrieve the content of all the submodules:

```bash
$> git submodule update --recursive
```

Create the file `.env` in the root directory of the project. This file will not be commited. The content is the following:

```bash
SLACK_BOT_TOKEN=xoxb-<replaceWithTheSlackBotToken>
IFLUX_SERVER_URL=http://<replaceWithTheBoot2DockerIp>:3000
IFLUX_SITE_URL=http://<replaceWithTheBoot2DockerIp>:4000
ENABLE_SLACK=<true|false>
```

## Run it with boot2docker

Run the following commands:

```bash
# The first time
$> boot2docker init

# Everytime you want the VM to be up
$> boot2docker up

# Setup your environment
$> $(boot2docker shellinit)

# Build all the containers
$> cd <projectRootDirectory>
$> docker-compose build

# Retrieve the external IP of the VM
$> echo $(boot2docker ip)

# Run the containers
$> docker-compose up

# Or if you want to run it in the background

$> docker-compose up -d
```

## Run it with Vagrant

The `Vagrant` file define the `public IP` of the VM to be `172.17.8.100`.

```bash
# Run the following command in the root directory
$> vagrant up
```
**Remark:** This is experimental and the provisioning part is sometimes crashing. When it happens, relaunch the same command
until the process succeed.

## Use it

Once everything is running, you will be able to access different services:

| Service             | Url                  |
| ------------------- | -------------------- |
| iFLUX Server        | http://<IP>:3000     |
| iFLUX Slack Gateway | http://<IP>:3001     |
| iFLUX Metrics       | http://<IP>:3002     |
| Citizen Engagement  | http://<IP>:3003/api |
| iFLUX MapBox Viewer | http://<IP>:3004     |
| iFLUX Blog          | http://<IP>:4000     |
| Mongo DB            | mongo://<IP>:27017   |

### iFLUX Server

This node is the heart of the system. It receives the `events` and triggers the `actions`.

### iFLUX Slack Gateway

Integration with [Slack](https://slack.com/) to send text messages on a specific channel.

### iFLUX Metrics

Collect and store metrics in a Mongo DB.

### Citizen Engagement

Demonstration backend done in the context of HEIG-VD course. Citizen Engagement offers an API to create new issues to assign
to users. An issue consist of a localized problem located in a city. Take a look to the [API documentation](https://polar-brook-7624.herokuapp.com).

### Publibike poller

Demonstration application to collect data about the [Publibike](https://www.publibike.ch).

### iFLUX MapBox Viewer

Demo application to show visual representation of the `actions` triggered from the `events` received on `iFLUX` server from
sources like `Citizen Engagement` app or `Publibike` app.

### Technical components

#### Citizen Simulator

An [API Copilot](https://github.com/lotaris/api-copilot) script to simulate relative natural data occurring in `Citizen Engagement` app.

#### iFLUX Client

The `nodejs` client to send events to `iFLUX`.

#### iFLUX Server Data

Docker container to store the data for Mongo DB. Currently, `Citizen Engagement`, `iFLUX Server` and `iFLUX Metrics` share the same mongo instance. All their data
are stored in the same data container.

#### iFLUX Server Migrator

Specialized container to allow data migration of the `iFLUX Server` Mongo DB. To run a migration, run:

```bash
$> docker run -e NODE_ENV=docker --link /ifluxdocker_mongo_1:mongo <IFLUXSERVER_MIGRATOR_IMAGE_ID>
```

#### iFLUX Starter

Starting script run when `docker-compose up` is invoked to make sure the `iFLUX` rules are setup correctly.

## Contributing

* [Fork](https://help.github.com/articles/fork-a-repo)
* Create a topic branch - `git checkout -b feature`
* Push to your branch - `git push origin feature`
* Create a [pull request](http://help.github.com/pull-requests/) from your branch

Please add a changelog entry with your name for new features and bug fixes.

## License

Probe Dock is licensed under the [GNU General Public License v3](http://www.gnu.org/licenses/gpl.html).
See [LICENSE.txt](LICENSE.txt) for the full license.
