package com.struts.action;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.Statement;

import com.struts.DbUtil;
import com.struts.dao.BookManagementDAO;

public class DBAction {

	
	public String execute() {
		createTables();
		return "success";
		
	}
	public void createTables() {
		try{
			Connection conn = DbUtil.getConnection();
		Statement st = conn.createStatement();
		Statement st1 = conn.createStatement();
		Statement st2 = conn.createStatement();
		Statement st3 = conn.createStatement();
		st.executeUpdate("DROP TABLE IF EXISTS user");
		st1.executeUpdate("DROP TABLE IF EXISTS book");
		 st2.executeUpdate("CREATE TABLE user(user_name varchar2(30),password varchar2(30))");
		 st3.executeUpdate("CREATE TABLE book(book_id varchar2(30),book_name varchar2,book_author varchar2(30),book_price int)");
		 PreparedStatement ps= conn.prepareStatement("INSERT INTO user VALUES(?,?)");
			ps.setString(1, "admin");
			ps.setString(2, "admin");
			ps.executeUpdate();
		PreparedStatement ps1= conn.prepareStatement("INSERT INTO book VALUES(?,?,?,?)");
			ps1.setString(1, "book1");
			ps1.setString(2, "Spring");
			ps1.setString(3, "jhon");
			ps1.setInt(4, 5000);
			ps1.executeUpdate();	
		
			DbUtil.closeConnection(conn);
			
			}
			catch(Exception e)
			{
				e.printStackTrace();
			}
	}
}
