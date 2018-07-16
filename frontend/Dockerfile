FROM node:8.11.3
WORKDIR /usr/src/app

COPY . .
RUN npm install -qy && chmod +x startup.sh


CMD ["npm", "start"]

EXPOSE 9000
