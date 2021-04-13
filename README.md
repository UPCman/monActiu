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

The following env variables must be declared on server, before start the flask backend server to handle mails (`/mailServer`)
```
EMAIL_USER
EMAIL_PASSWORD
```
