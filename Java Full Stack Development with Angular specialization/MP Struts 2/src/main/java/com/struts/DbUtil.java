package com.struts;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;

public class DbUtil {

	public static Connection getConnection()
	{
		Connection conn = null;
		try 
		{
			
			Class.forName ("org.h2.Driver"); 
			 conn = DriverManager.getConnection ("jdbc:h2:~/test", "sa","");
			 
		
		}
		catch(Exception e)
		{
			e.printStackTrace();
		}
		return conn;
	}
	
	
	public static void closeConnection(Connection conn)
	{
		try {
			conn.close();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	
	
}
