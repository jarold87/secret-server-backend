FROM node:12.16.2

ADD . /var/www/secret-server
WORKDIR /var/www/secret-server

COPY build/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

RUN npm install
RUN npm install --global gulp

EXPOSE 3000

RUN gulp

ENTRYPOINT ["entrypoint.sh"]
