# -*- mode: ruby -*-
# vi: set ft=ruby :

# Vagrantfile API/syntax version. Don't touch unless you know what you're doing!
VAGRANTFILE_API_VERSION = '2'

HOST_IP = '172.17.8.100'
IFLUX_HOME = '/home/vagrant/iflux-docker'

Vagrant.configure(VAGRANTFILE_API_VERSION) do |config|

  # Limitate the resources used by our VMs
  config.vm.provider :virtualbox do |v|
    v.gui = false
    v.memory = 1024
    v.cpus = 2
    v.customize ['modifyvm', :id, '--cpuexecutioncap', '70']
  end


  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = 'ubuntu/trusty64'

  # Multiple machines can be defined within the same project Vagrantfile
  # using the config.vm.define method call.
  config.vm.define :iflux do |vdocker|

    # Install the latest version of Docker
    vdocker.vm.provision :docker, type: :shell, inline: <<SH
      # If you'd like to try the latest version of Docker:
      # First, check that your APT system can deal with https URLs:
      # the file /usr/lib/apt/methods/https should exist.
      # If it doesn't, you need to install the package apt-transport-https.
      [ -e /usr/lib/apt/methods/https ] || {
      apt-get -y update
      apt-get -y install apt-transport-https
      }
      # Then, add the Docker repository key to your local keychain.
      sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 36A1D7869245C8950F966E92D8576A8BA88D21E9
      # Add the Docker repository to your apt sources list,
      # update and install the lxc-docker package.
      # You may receive a warning that the package isn't trusted.
      # Answer yes to continue installation.
      sh -c "echo deb https://get.docker.io/ubuntu docker main > /etc/apt/sources.list.d/docker.list"
      apt-get -y update
      apt-get -y install lxc-docker
SH

    # Install Docker Compose
    vdocker.vm.provision :compose, type: :shell, inline: <<SH
			echo "Installing Docker Compose"
			export ARCH=$(uname -m)
			export DIST=$(uname -s)
 			curl -L "https://github.com/docker/compose/releases/download/1.1.0/docker-compose-$DIST-$ARCH" > /usr/local/bin/docker-compose;
			chmod +x /usr/local/bin/docker-compose
			echo "Docker Compose installed"
SH

		vdocker.vm.provision :iflux_prepare, type: :shell, privileged: false, inline: <<SH
			mkdir -p #{IFLUX_HOME}
			echo 'Prepare env file'
			sed 's/:.*:/:\\/\\/#{HOST_IP}:/' < /home/vagrant/mnt/.env > #{IFLUX_HOME}/.env
			echo 'Prepare compose file - step 1'
			sed 's/build: /build: \\/home\\/vagrant\\/mnt\\//' < /home/vagrant/mnt/docker-compose.yml > #{IFLUX_HOME}/docker-compose.yml
			echo 'Prepare compose file - step 2'
			sed -i -e 's/\\.env/\\/home\\/vagrant\\/iflux-docker\\/.env/' #{IFLUX_HOME}/docker-compose.yml
			echo 'iFLUX Docker config ready'
SH

		vdocker.vm.provision :docker_build, type: :shell, inline: <<SH
			cd #{IFLUX_HOME}
			echo "Building containers"
			docker-compose build
			echo "iFLUX images built"
SH

    # Install Docker Compose
    vdocker.vm.provision :docker_run, type: :shell, inline: <<SH
			cd #{IFLUX_HOME}
			echo "Starting containers"
			docker-compose up -d
			echo "iFLUX containers started"
SH

    vdocker.vm.network :forwarded_port, guest: 3000, host: 3000
		vdocker.vm.network :forwarded_port, guest: 3001, host: 3001
		vdocker.vm.network :forwarded_port, guest: 3002, host: 3002
		vdocker.vm.network :forwarded_port, guest: 3003, host: 3003
		vdocker.vm.network :forwarded_port, guest: 4000, host: 4000

    # Since we mount the dir using NFS we need a private network
    vdocker.vm.network :private_network, ip: HOST_IP

    # Using NFS because some shits, such as Mongod, don't know how to deal with some flavors of partition system
    vdocker.vm.synced_folder '.', '/home/vagrant/mnt', :nfs => true, :mount_options => ['nolock,vers=3,udp']

  end
end
