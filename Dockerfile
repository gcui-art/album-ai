FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY . ./

RUN rm -rf /app/node_modules && rm -rf /app/dist && npm install && npm run build

CMD npm run start:prod

EXPOSE 8080
