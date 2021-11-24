cd Angular/
sudo apt-get remove node -y;
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -;
sudo apt-get install -y nodejs;
npm install
echo "Angular installation done"
cd ../
cd HealthCareService
mvn install
echo "Maven installation done"
cd ../
echo "All installations done"


