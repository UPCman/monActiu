#!/bin/bash
# Copy and execute this file to the server. Run after execute deploy.sh in local.

rm -rf /home/dist
tar -C /home/ -xvf /home/monActiu.tar.gz
rm -rf /var/www/html/*
cp -r /home/dist/monActiu/* /var/www/html