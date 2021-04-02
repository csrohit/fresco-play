package com.fresco.login;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Login")
public class LoginServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
// your code here
    String email = request.getParameter("email");
    String password = request.getParameter("password");
    boolean validated = Validate.checkUser(email, password);
    PrintWriter writer = response.getWriter();
    if(validated){
    RequestDispatcher dispatcher = request.getRequestDispatcher("Welcome");
    dispatcher.forward(request, response);
    }else{
      writer.write("Username or Password incorrect");
    }
	}

}
