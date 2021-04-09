#!/bin/bash

ng build --prod
tar -zcvf monActiu.tar.gz dist/monActiu
scp monActiu.tar.gz root@217.76.155.105:/home
