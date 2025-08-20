#!/bin/bash 

set -e

if [ "$1" != "RENDER" ]; then 
    sudo apt update 
    sudo apt upgrade -y
    sudo apt install -y npm
fi

cd client
npm ci
npm run build
cd ..

rm -rf server/frontend
cp -r client/build server/frontend

cd server
npm ci

echo -e "[+] Build completed"