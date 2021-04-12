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
