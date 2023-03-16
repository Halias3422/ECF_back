FROM node:19

WORKDIR /app

COPY /app/package.json .

RUN yarn

COPY /app .

EXPOSE 5000

CMD ["yarn", "start"]
