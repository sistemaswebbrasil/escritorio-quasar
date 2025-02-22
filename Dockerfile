FROM node:20 AS build
WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN npm install -g pnpm && pnpm install --ignore-scripts
COPY . .
RUN pnpm build

FROM nginx:alpine
WORKDIR /usr/share/nginx/html
COPY --from=build /app/dist/spa /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf.template
CMD /bin/sh -c "envsubst '\${API_URL} \${API_HOST} \${API_VIACEP_URL}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf && nginx -g 'daemon off;'"
EXPOSE 3000