$(wget https://chromedriver.storage.googleapis.com/89.0.4389.23/chromedriver_linux64.zip)
$(sudo unzip -o chromedriver_linux64.zip)
$(sudo rm chromedriver_linux64.zip)
$(wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | sudo apt-key add -)
$(sudo sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list')
$(sudo apt-get update)
$(sudo apt-get install google-chrome-stable -y)
$(sudo apt update)
$(sudo apt install maven -y)
$(sudo pip3 install selenium)
$(sudo pip3 install requests)
echo "Installation is complete"

