FROM nginx:alpine

# Copy React build files
COPY --from=frontend-dist /dist /usr/share/nginx/html

# Copy Nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf
