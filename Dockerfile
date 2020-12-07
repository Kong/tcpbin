FROM node:slim
LABEL maintainer="Narate Ketram <rate@dome.cloud>"
WORKDIR /app
ADD . .
RUN npm install
EXPOSE 30000/tcp 30001/tcp 40000/udp 40001/udp
CMD ["node", "lib/server.js"]
