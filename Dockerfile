FROM node:12.22.6

ADD . /var/www/secret-server
WORKDIR /var/www/secret-server

RUN npm install
RUN npm install --global gulp

COPY build/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 3000

RUN gulp

ENTRYPOINT ["entrypoint.sh"]
