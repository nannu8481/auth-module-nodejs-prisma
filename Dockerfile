FROM node:16.15.0
ENV NODE_ENV=development
WORKDIR /app
COPY package*.json ./
COPY tsconfig.json ./
COPY . .
RUN npm install --development
RUN npm run tsc
CMD [ "node", "index.js" ]