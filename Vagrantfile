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
    v.memory = 2048
    v.cpus = 2
    v.customize ['modifyvm', :id, '--cpuexecutioncap', '70']
  end


  # Every Vagrant virtual environment requires a box to build off of.
  config.vm.box = 'ubuntu/trusty64'

  # Multiple machines can be defined within the same project Vagrantfile
  # using the config.vm.define method call.
  config.vm.define :iflux do |vdocker|
    # Install the latest version of Docker
    vdocker.vm.provision :docker, type: :shell, path: 'scripts/install.sh', run: 'once'

    # Configure
		vdocker.vm.provision :iflux_prepare, type: :shell, path: 'scripts/configure.sh', args: [ IFLUX_HOME, HOST_IP ]

    # Install Docker Compose
    vdocker.vm.provision :docker_run, type: :shell, path: 'scripts/run.sh', args: [ IFLUX_HOME ]

    # vdocker.vm.network :forwarded_port, guest: 2181, host: 2181
    vdocker.vm.network :forwarded_port, guest: 3000, host: 3000
    # vdocker.vm.network :forwarded_port, guest: 3001, host: 3001
    # vdocker.vm.network :forwarded_port, guest: 3002, host: 3002
    # vdocker.vm.network :forwarded_port, guest: 3003, host: 3003
    # vdocker.vm.network :forwarded_port, guest: 3004, host: 3004
    # vdocker.vm.network :forwarded_port, guest: 3005, host: 3005
    # vdocker.vm.network :forwarded_port, guest: 3006, host: 3006
    # vdocker.vm.network :forwarded_port, guest: 4000, host: 4000
    # vdocker.vm.network :forwarded_port, guest: 5432, host: 5432
    # vdocker.vm.network :forwarded_port, guest: 5601, host: 5601
    # vdocker.vm.network :forwarded_port, guest: 9092, host: 9092
    # vdocker.vm.network :forwarded_port, guest: 9200, host: 9200
    # vdocker.vm.network :forwarded_port, guest: 9300, host: 9300
    # vdocker.vm.network :forwarded_port, guest: 27017, host: 27017

    # Since we mount the dir using NFS we need a private network
    vdocker.vm.network :private_network, ip: HOST_IP

    # Using NFS because some shits, such as Mongod, don't know how to deal with some flavors of partition system
    vdocker.vm.synced_folder '.', '/home/vagrant/mnt', :nfs => true, :mount_options => ['nolock,vers=3,udp']

  end
end
