FROM node:12
RUN npm i -g bit-bin npm
RUN echo "source /usr/src/docker/bit-env.sh" >> /root/.bashrc
SHELL ["/bin/bash", "-c"]
RUN apt-get update -y && apt-get install -y  --no-install-recommends joe=4.4-1  \
 && apt-get clean \
 && rm -rf /var/lib/apt/lists/*
WORKDIR /usr/src/
