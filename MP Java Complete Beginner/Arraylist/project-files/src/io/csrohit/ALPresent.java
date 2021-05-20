package io.csrohit;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
public class ALPresent {
    
    public boolean isALPresent() throws FileNotFoundException, IOException
    {
        String line,s="";
        File file=new File("/projects/challenge/BusProb/src/main/java/com/fresco/BusProb.java");
        FileReader fr=new FileReader(file);
        BufferedReader br=new BufferedReader(fr);
        while((line=br.readLine())!=null)
            s+=line;
        String str1 = null,str2=null;
        if(s.contains("import java.util.ArrayList;") || s.contains("import java.util.*"))
        {
            try
            {
                str1=s.substring(s.indexOf("ArrayList<"),s.indexOf("new ArrayList"));
            }
            catch(Exception e)
            {
            }
            try
            {
                str2=s.substring(s.indexOf("List<"),s.indexOf("new ArrayList"));
            }
            catch(Exception e)
            {
            }
        }
        if(str1 != null) {
            if(str1.length()>10)
                return true;
        }
        if(str2 != null) {
            if(str2.length()>5)
                return true;
        }
            return false;
    }
}
