FROM node:16.14-alpine

WORKDIR /frontend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4000

ENTRYPOINT ["npm"]

CMD ["start"]
