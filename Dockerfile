FROM node:21-alpine3.19

RUN mkdir -p /var/www/app

WORKDIR /var/www/app

COPY package.json /var/www/app/

RUN npm install

COPY . /var/www/app

EXPOSE 8000

CMD ["npm","start"]