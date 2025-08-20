#!/bin/bash 

set -e

cd client
npm ci
npm run build
cd ..

cp -r client/dist frontend

cd server
npm ci

echo -e "[+] Build completed"