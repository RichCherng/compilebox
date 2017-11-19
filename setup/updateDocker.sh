echo "Creating Docker Image"
docker build -i 'virtual_machine' - < Dockerfile
echo "Retrieving Installed Docker Images"
docker images