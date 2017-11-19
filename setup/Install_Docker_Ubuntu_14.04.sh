#!/usr/bin/env bash


##########################
# Docker Setup
##########################

apt-get update
apt-get install -y docker.io
ln -sf /usr/bin/docker.io /usr/local/bin/docker
sed -i '$acomplete -F _docker docker' /etc/bash_completion.d/docker.io
