FROM node:19

RUN npm install -g http-server

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build-development

EXPOSE 8080

ENV TZ=America/Sao_Paulo

CMD [ "http-server", "dist" ]