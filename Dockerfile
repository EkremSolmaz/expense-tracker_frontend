FROM node:alpine

#copy source 
COPY . /app

# Install deps 
RUN cd /app && yarn

# Build 
RUN yarn build

ENTRYPOINT [ "yarn", "start" ]