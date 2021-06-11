npm run-script coverage > /dev/null 2>&1 &
sleep 2
sudo kill -9 $!
npm run-script coverage
node score.js
cat unit.xml