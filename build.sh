#!/bin/bash 

set -e

cd client
npm ci
npm run build
cd ..

rm -rf server/frontend
cp -r client/dist server/frontend

cd server
npm ci

echo -e "[+] Build completed"