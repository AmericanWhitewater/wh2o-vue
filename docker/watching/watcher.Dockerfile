FROM node:12
RUN npm i -g bit-bin npm
RUN echo "source /usr/src/docker/bit-env.sh" >> /root/.bashrc
SHELL ["/bin/bash", "-c"]
RUN apt-get update -y
RUN apt-get install -y joe
WORKDIR /usr/src/
