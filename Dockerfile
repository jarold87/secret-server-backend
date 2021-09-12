FROM node:12.16.2

ADD . /var/www/secret-server
WORKDIR /var/www/secret-server

RUN npm install

EXPOSE 3000

RUN gulp

ENTRYPOINT ["entrypoint.sh"]
