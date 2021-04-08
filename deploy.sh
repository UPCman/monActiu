#!/bin/bash

ng build
tar -zcvf monActiu.tar.gz dist/monActiu
scp monActiu.tar.gz root@217.76.155.105:/home