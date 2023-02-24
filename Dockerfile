FROM node:alpine

#copy source 
COPY . .

# Install deps 
RUN yarn

# Build 
RUN yarn build

ENTRYPOINT [ "yarn", "start" ]