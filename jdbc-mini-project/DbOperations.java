
package com.fresco.jdbc.code;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.fresco.jdbc.code.util.DbUtil;

public class DbOperations {
    Connection con;
    public static final String INSERT_SUBJECT = "INSERT INTO subject (name) VALUES (?)";
    public static final String GET_ID_SUBJECT = "SELECT id, name FROM subject WHERE id = ?";
    public static final String GET_ALL_SUBJECT = "SELECT id, name FROM subject";

    public static final String INSERT_STUDENT = "INSERT INTO student (name, score, id) VALUES (?, ?, id) SELECT id FROM subject WHERE name = \"?\"";
    public static final String GET_ID_STUDENT = "SELECT id, name, score, subject_id FROM student WHERE id = ?";
    public static final String GET_ALL_STUDENT = "SELECT * FROM student";

    public DbOperations() {
        con = DbUtil.getConnection();
    }

    public boolean insertSubject(String name) throws SQLException {
        PreparedStatement preparedStatement = this.con.prepareStatement(INSERT_SUBJECT);
        preparedStatement.setString(1, name);
        return preparedStatement.execute();
    }

    public ArrayList getSubjectById(int id) throws SQLException {
        PreparedStatement preparedStatement = this.con.prepareStatement(GET_ID_SUBJECT);
        preparedStatement.setInt(1, id);
        ResultSet resultSet = preparedStatement.executeQuery();
        ArrayList arrayList = new ArrayList();
        while(resultSet.next()){
            arrayList.add(resultSet.getInt("id"));
            arrayList.add(resultSet.getString("name"));
        }
        return arrayList;
    }

    public ResultSet getAllSubjects() throws SQLException {
        PreparedStatement preparedStatement = this.con.prepareStatement(GET_ALL_SUBJECT);
        ResultSet resultSet = preparedStatement.executeQuery();


        return resultSet;
    }

    public boolean insertStudent(String student_name, float score, String name) throws SQLException {
        PreparedStatement statement = this.con.prepareStatement("INSERT INTO student (student_name, score, id) VALUES (?, ?, (SELECT id FROM subject WHERE name = ?))");
        statement.setString(1, student_name);
        statement.setFloat(2, score);
        statement.setString(3,name);
        return statement.execute();

    }

    public ArrayList getStudentyId(int id) throws SQLException {
        PreparedStatement statement = this.con.prepareStatement(GET_ID_STUDENT);
        statement.setInt(1, id);
        ArrayList arrayList = new ArrayList();
        ResultSet resultSet = statement.executeQuery();
        while(resultSet.next()){
            arrayList.add(resultSet.getInt("id"));
            arrayList.add(resultSet.getString("student_name"));
            arrayList.add(resultSet.getFloat("score"));
            arrayList.add(resultSet.getInt("subject_id"));
        }
        return null;
    }

    public ResultSet getAllStudents() throws SQLException {
        PreparedStatement preparedStatement = this.con.prepareStatement(GET_ALL_STUDENT);
        ResultSet resultSet = preparedStatement.executeQuery();


        return resultSet;
    }

}package com.fresco.jdbc.code;

        import java.sql.Connection;
        import java.sql.Date;
        import java.sql.PreparedStatement;
        import java.sql.ResultSet;
        import java.sql.SQLException;
        import java.sql.Statement;
        import java.util.ArrayList;
        import java.util.List;

        import com.fresco.jdbc.code.util.DbUtil;

public class DbOperations {
    Connection con;
    public static final String INSERT_SUBJECT = "INSERT INTO subject (name) VALUES (?)";
    public static final String GET_ID_SUBJECT = "SELECT id, name FROM subject WHERE id = ?";
    public static final String GET_ALL_SUBJECT = "SELECT id, name FROM subject";

    public static final String INSERT_STUDENT = "INSERT INTO student (name, score, id) VALUES (?, ?, id) SELECT id FROM subject WHERE name = \"?\"";
    public static final String GET_ID_STUDENT = "SELECT id, student_name, score, subject_id FROM student WHERE id = ?";
    public static final String GET_ALL_STUDENT = "SELECT * FROM student";

    public DbOperations() {
        con = DbUtil.getConnection();
    }

    public boolean insertSubject(String name) throws SQLException {
        PreparedStatement preparedStatement = this.con.prepareStatement(INSERT_SUBJECT);
        preparedStatement.setString(1, name);
        return preparedStatement.execute();
    }

    public ArrayList getSubjectById(int id) throws SQLException {
        PreparedStatement preparedStatement = this.con.prepareStatement(GET_ID_SUBJECT);
        preparedStatement.setInt(1, id);
        ResultSet resultSet = preparedStatement.executeQuery();
        ArrayList arrayList = new ArrayList();
        while(resultSet.next()){
            arrayList.add(resultSet.getInt("id"));
            arrayList.add(resultSet.getString("name"));
        }
        return arrayList;
    }

    public ResultSet getAllSubjects() throws SQLException {
        PreparedStatement preparedStatement = this.con.prepareStatement(GET_ALL_SUBJECT);
        ResultSet resultSet = preparedStatement.executeQuery();


        return resultSet;
    }

    public boolean insertStudent(String student_name, float score, String name) throws SQLException {
        PreparedStatement statement = this.con.prepareStatement("INSERT INTO student (student_name, score, subject_id) VALUES (?, ?, (SELECT id FROM subject WHERE name = ?))");
        statement.setString(1, student_name);
        statement.setFloat(2, score);
        statement.setString(3,name);
        return statement.execute();

    }

    public ArrayList getStudentyId(int id) throws SQLException {
        PreparedStatement statement = this.con.prepareStatement(GET_ID_STUDENT);
        statement.setInt(1, id);
        ArrayList arrayList = new ArrayList();
        ResultSet resultSet = statement.executeQuery();
        while(resultSet.next()){
            arrayList.add(resultSet.getInt("id"));
            arrayList.add(resultSet.getString("student_name"));
            arrayList.add(resultSet.getFloat("score"));
            arrayList.add(resultSet.getInt("subject_id"));
        }
        return null;
    }

    public ResultSet getAllStudents() throws SQLException {
        PreparedStatement preparedStatement = this.con.prepareStatement(GET_ALL_STUDENT);
        ResultSet resultSet = preparedStatement.executeQuery();


        return resultSet;
    }

}