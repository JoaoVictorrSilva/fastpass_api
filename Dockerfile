FROM node:22.13.1

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x /usr/src/app/entrypoint.sh

EXPOSE 3333

ENTRYPOINT ["/usr/src/app/entrypoint.sh"]

CMD ["npm", "run", "start:dev"]
