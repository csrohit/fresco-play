sudo mkdir -p /usr/repos/repo1
sudo mkdir -p /usr/repos/repo2
sudo mkdir -p /usr/repos/repo3
sudo touch /usr/repos/repo1/text1.txt
sudo touch /usr/repos/repo1/text2.txt
sudo touch /usr/repos/repo1/text3.txt
sudo chmod 777 -R /usr/repos/
sudo apt-get update
sudo apt install maven -y
pip3 install selenium
rm chromedriver
wget https://chromedriver.storage.googleapis.com/78.0.3904.105/chromedriver_linux64.zip
unzip -o chromedriver_linux64.zip
rm chromedriver_linux64.zip
echo "Installation is done !"