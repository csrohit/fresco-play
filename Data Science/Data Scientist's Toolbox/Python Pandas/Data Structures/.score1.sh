if [ -s out.txt ]
then
    b=$(grep -E '^[[:digit:]]+$' out.txt)
  echo "FS_SCORE:$b%"
else
    echo "FS_SCORE:0%"
fi

