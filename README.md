# MonActiu

Mon Actiu WebPage.  

## Deployment
To deploy to the server, first run the deploy.sh bash script `./deploy` , then copy and run the server_deploy.sh ON THE SERVER.  
`ssh root@217.76.155.105`

## Debug
To run the app on local network for debug purposes, run:  
`ng serve --host 192.168.1.134`  

*Increase the OS inotify value in case of error:  
`echo 16384 | sudo tee /proc/sys/fs/inotify/max_user_watches`


## Server Config
Install nginx and edit the config file on `/etc/nginx/conf.d/nginx.conf`:  
```
  server {
  listen 80;
  listen   443;

  ssl    on;
  ssl_certificate    /etc/ssl/monactiufisioterapia.com_ssl_certificate.cer;
  ssl_certificate_key    /etc/ssl/_.monactiufisioterapia.com_private_key.key;

  server_name monactiufisioterapia.com;
  location /api/contact/ {
    # Flask API Rest
    proxy_pass http://127.0.0.1:5000;
    # Redefine the header fields that NGINX sends to the upstream server
    proxy_set_header Host \$host;
    proxy_set_header X-Real-IP \$remote_addr;
    proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
  }

  location / {
    root   /home/dist/monActiu/;
    try_files $uri $uri/ /index.html;
    index  index.html;
  }
}

# Redirige de http://monactiufisioterapia.com a https://monactiufisioterapia.com
server {
  listen 80;
  return 301 https://$host$request_uri;
}

# Redirige de http://www.monactiufisioterapia.com a https://monactiufisioterapia.com
server {
  listen 80;
  server_name www.monactiufisioterapia.com;
  return 301 https://monactiufisioterapia.com$request_uri;
}

# Redirige de https://www.monactiufisioterapia.com a https://monactiufisioterapia.com
server {
  listen 443;
  server_name www.monactiufisioterapia.com;
  return 301 $scheme://monactiufisioterapia.com$request_uri;
}

# Redirige de monactiufisioterapia.com a https://monactiufisioterapia.com
server {
  listen 80;
  server_name monactiufisioterapia.com;
  return 301 https://monactiufisioterapia.com$request_uri;
}
```

Then restart nginx: `sudo /etc/init.d/nginx restart`

- Copy the mailServer on server `/mailServer/mailServer.py`.   
The following env variables must be declared on server  (`/etc/environment`), before start the flask backend server to handle mails (`/mailServer`)
```
EMAIL_USER=monactiucontactform@gmail.com
EMAIL_PASSWORD=*********
FLASK_APP=/home/mailServer.py
FLASK_ENV="production"
APP_SETTINGS_MODULE="config.prod"
```
- To start the flask mailServer: `gunicorn --bind 0.0.0.0:5000 mailServer:app &`

- To kill gunicorn processes:  
`pkill gunicorn`  
`pkill -1 gunicorn`
