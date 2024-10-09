# Base image
FROM nginx:alpine

# Copy frontend files to the web server directory
COPY . /usr/share/nginx/html

# Expose port 80 for HTTP traffic
EXPOSE 80
