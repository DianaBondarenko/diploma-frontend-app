FROM node:latest

WORKDIR /usr/app
COPY . /usr/app

RUN npm install yarn
RUN npm install -g serve

RUN yarn install
RUN DISABLE_ESLINT_PLUGIN=true yarn react-scripts build

CMD ["serve", "-s", "build"]