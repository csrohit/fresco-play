cd angular/
npm install > /dev/null 2>&1
npm test > /dev/null 2>&1
cat unit.xml
cd ../nodejs/
npm install > /dev/null 2>&1
bash dbinstall.sh > /dev/null 2>&1
bash test.sh > //dev/null 2>&1
npm run lint > /dev/null 2>&1
npm run test > /dev/null 2>&1
cat test-results.xml
cd ..