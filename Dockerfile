# 1. build the front-end
FROM mhart/alpine-node:12 AS build-front
RUN mkdir /tmp-build-front
WORKDIR /tmp-build-front
COPY sathish-test/package*.json ./
RUN npm set progress=false && npm config set depth 0 && npm cache clean --force
RUN npm install
COPY sathish-test/. ./

RUN npm run build-prod 

RUN ls /tmp-build-front/
RUN ls /tmp-build-front/public

# 2. Build the back-end
FROM mhart/alpine-node:12 AS build-backend
RUN apk add --update-cache \
    python \
    python-dev \
    py-pip \
    build-base \
    && pip install virtualenv \
    && rm -rf /var/cache/apk/*
RUN mkdir /tmp-build-backend
ENV PORT 8080 

WORKDIR /tmp-build-backend
COPY express-backend/package*.json ./
#RUN npm install typescript@3.4.5

RUN npm install
COPY account-backend/. ./
RUN npm run build
run ls /tmp-build-backend
run ls /tmp-build-backend/dist


# 3. prepare the final front & back-end
FROM mhart/alpine-node:12
RUN mkdir /sathish-app
COPY --from=build-backend /tmp-build-backend/ /sathish-app/
COPY --from=build-front /tmp-build-front/public/ /sathish-app/dist/public
WORKDIR /sathish-app
# RUN ls /sathish-app/public
EXPOSE 8080
# 4. run this web-application
ENV NODE_ENV=production
ENV NODE_ENV production
RUN ls /sathish-app/

CMD [ "npm", "run", "start-prod" ]