#!/bin/bash

cd $1

echo "Starting containers"
sudo ./start.sh rp
echo "iFLUX containers started"