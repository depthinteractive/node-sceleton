FROM node:latest
WORKDIR /app
COPY package.json /app
RUN npm install && npm install -g tsc && npm install -g typescript
COPY . /app
CMD npm run dev
EXPOSE 5000