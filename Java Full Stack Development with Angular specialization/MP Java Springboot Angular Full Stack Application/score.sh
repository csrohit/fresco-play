#!/bin/sh
cd HealthCareService
mvn test
cd ../
cd Angular
sudo apt-get remove node -y;
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -;
sudo apt-get install -y nodejs;
npm install;
./node_modules/.bin/ng test --watch=false
