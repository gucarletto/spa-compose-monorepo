FROM node:alpine

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./package.json .
COPY ./yarn.lock .

RUN yarn install

COPY . .

 EXPOSE 4000

CMD yarn dev