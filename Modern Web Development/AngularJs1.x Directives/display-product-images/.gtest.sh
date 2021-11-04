timeout 15s  grunt concurrent;

 if [ $? -ne 124 ] ; then 
  grunt protractor 
 fi
