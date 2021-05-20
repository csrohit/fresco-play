sudo apt-get update
echo 'mysql-server mysql-server/root_password password mysql' | sudo debconf-set-selections
echo 'mysql-server mysql-server/root_password_again password mysql' | sudo debconf-set-selections
sudo apt-get -y install mysql-server
sudo service mysql start
python3 -m pip install mysql-connector	
pip3 install bcrypt
mysqladmin -uroot -pmysql create CodeLab
dbstring="mysql -uroot -pmysql -DCodeLab"
echo "CREATE TABLE user (id int AUTO_INCREMENT PRIMARY KEY,fullname varchar(30), username varchar(30), password text)" > create_table.sql
$dbstring  < create_table.sql
rm create_table.sql
echo "done................!"
