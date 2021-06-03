package com;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.Map;
import java.util.UUID;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class CreateRepo
 */
public class CreateRepo extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public static int count = 0;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public CreateRepo() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
//		response.getWriter().append("Served at: ").append(request.getContextPath());
        response.sendRedirect("/RepoRequest.jsp");
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        try {

            String userId = request.getParameter("userId");
            String RepoName = request.getParameter("RepoName");
            String RepoDesc = request.getParameter("RepoDesc");
            String RepoDev = request.getParameter("RepoDev");

            Class.forName("com.mysql.cj.jdbc.Driver");
            Connection con = DriverManager.getConnection("jdbc:mysql://localhost:3306/DBConnection", "root", "mysql");

            PreparedStatement ps = con.prepareStatement("insert into repos values(?,?,?,?,?)");
            ps.setString(1, "" + ++count);
            ps.setString(2, userId);
            ps.setString(3, RepoName);
            ps.setString(4, RepoDesc);
            ps.setString(5, RepoDev);
            ps.executeUpdate();
            con.close();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}
