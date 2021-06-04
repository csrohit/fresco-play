package com;

import java.io.IOException;
import java.sql.*;
import java.util.UUID;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class CreateUser
 */
public class CreateUser extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public static int count = 0;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreateUser() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
//        response.getWriter().append("Served at: ").append(request.getContextPath());
        response.sendRedirect("index.jsp");
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
        try {

            String userName = request.getParameter("userName").toString();

            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/DBConnection", "root", "mysql");

            Statement st = con.createStatement();
            ResultSet rs = st.executeQuery("select * from users where userName=\"" + userName + "\";");

            if (rs.next()) {
                request.setAttribute("exists", "user already exists");
            } else {
                PreparedStatement ps = con.prepareStatement("insert into users values(?,?)");
                ps.setString(1, "" + ++count);
                ps.setString(2, userName);
                ps.executeUpdate();
                con.close();

                request.setAttribute("success", "User created");
            }

        } catch (Exception e) {
            request.setAttribute("failed", "something went wrong");
            e.printStackTrace();
        }

        RequestDispatcher rd = request.getRequestDispatcher("index.jsp");
        rd.forward(request, response);

    }
}
