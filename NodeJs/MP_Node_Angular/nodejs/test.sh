bash delete.sh
cp API/* "APITest"
cd APITest
for file in *;do sed -i '/req.body=JSON.parse(Object.keys(req.body)\[0\]);/d' "$file";done
