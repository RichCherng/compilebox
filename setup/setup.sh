#!/usr/bin/env bash

###################
# Setup Script
################### 


# Run as root
if [ "$EUID" -ne 0 ]
  then echo "Please run as root"
  exit
fi



#################
# NodeJS Setup
#################

apt-get update
apt-get install -y nodejs
apt-get install -y npm
echo "NodeJS setup Completed"





## Get Linux Distribution and Version ##

if [ -f /etc/os-release ]; then
    # freedesktop.org and systemd
    . /etc/os-release
    OS=$NAME
    VER=$VERSION_ID
elif type lsb_release >/dev/null 2>&1; then
    # linuxbase.org
    OS=$(lsb_release -si)
    VER=$(lsb_release -sr)
elif [ -f /etc/lsb-release ]; then
    # For some versions of Debian/Ubuntu without lsb_release command
    . /etc/lsb-release
    OS=$DISTRIB_ID
    VER=$DISTRIB_RELEASE
elif [ -f /etc/debian_version ]; then
    # Older Debian/Ubuntu/etc.
    OS=Debian
    VER=$(cat /etc/debian_version)
elif [ -f /etc/SuSe-release ]; then
    # Older SuSE/etc.
    ...
elif [ -f /etc/redhat-release ]; then
    # Older Red Hat, CentOS, etc.
    ...
else
    # Fall back to uname, e.g. "Linux <version>", also works for BSD, etc.
    OS=$(uname -s)
    VER=$(uname -r)
fi

########################################



chmod +x Install_Docker*


# chmod 777 ../API/DockerTimeout.sh
# chmod 777 ../API/Payload/script.sh
# chmod 777 ../API/Payload/javaRunner.sh
chmod 777 UpdateDocker.sh


if [ $OS = "Ubuntu" ]; then
	
	echo $OS

	## 12.04 ##
	if [ $VER = "12.04" ]; then
		./Install_Docker_Ubuntu_12.04.sh
	elif [ $VER = "13.04" ] || [ $VER = "13.10" ]; then
		./Install_Docker_Ubuntu_13.sh
	elif [ $VER = "14.04" ]; then
		./Install_Docker_Ubuntu_14.04.sh
		service docker.io restart
	elif [ $VER = "16.04" ]; then
		./Install_Docker_Ubuntu_16.04.sh
		systemctl restart docker
	fi
	echo "Docker Setup completed"
fi

./UpdateDocker.sh