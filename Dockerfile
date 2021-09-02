FROM node:14.0

WORKDIR /home/nodeJs

COPY ./ /home/nodeJs

RUN npm install

CMD npm run start

EXPOSE 3010
