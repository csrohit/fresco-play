package util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DbUtil {
    public DbUtil(){
    }

    public static Connection getConnection() {
        Connection con = null;
        try{
            Properties properties = new Properties();
            properties.setProperty("user", "root");
            properties.setProperty("password", "password");
            con= DriverManager.getConnection("jdbc:mysql://localhost:3306/mydb", properties);
        }catch (SQLException e){
            e.printStackTrace();
        }
        return con;
    }

}
