FROM node:18-alpine

WORKDIR /app

COPY package*.json .npmrc ./

# Install Python and build dependencies for native modules
RUN apk add --no-cache --virtual .gyp python3 make g++ \
  && if [ ! -e /usr/bin/python ]; then ln -s python3 /usr/bin/python; fi


RUN npm install

COPY . .

RUN npm run build

# Cleanup the build dependencies to keep the image clean and small
RUN apk del .gyp

CMD ["node", "lib/main.js"]
