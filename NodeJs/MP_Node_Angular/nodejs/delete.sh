sudo service mongod start
mongo --eval 'db.users.remove({})' PatientManagement
