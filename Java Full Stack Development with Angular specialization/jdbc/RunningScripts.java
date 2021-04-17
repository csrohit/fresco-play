package com.fresco.jdbc.code.util;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.Reader;
import java.sql.Connection;

import org.apache.ibatis.jdbc.ScriptRunner;


public class RunningScripts {
   public void runDbScript() throws Exception {
              ScriptRunner sr = new ScriptRunner(DbUtil.getConnection());
        //Creating a reader object
        Reader reader = new BufferedReader(new FileReader("./db.sql"));
        //Running the script
        sr.runScript(reader);
      
   }
}