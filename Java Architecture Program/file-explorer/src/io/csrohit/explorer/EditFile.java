package io.csrohit.explorer;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;
import java.nio.file.Files;
import java.nio.file.Path;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class EditFile
 */
@WebServlet("/EditFile")
public class EditFile extends HttpServlet {
	private static final long serialVersionUID = 1L;
	
    /**
     * Default constructor. 
     */
    public EditFile() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String path = request.getParameter("path");
		String fullFilePath = path;
		String text = Files.readString(Path.of(fullFilePath));
		request.setAttribute("content", text);
		request.setAttribute("path", fullFilePath);

		PrintWriter writer = response.getWriter();
		writer.println("<!DOCTYPE html>\r\n"
				+ "<html lang=\"\">\r\n"
				+ "\r\n"
				+ "<head>\r\n"
				+ "    <meta charset=\"utf-8\">\r\n"
				+ "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\r\n"
				+ "    <title></title>\r\n"
				+ "    <link rel=\"stylesheet\" href=\"style.css\">\r\n"
				+ "</head>\r\n"
				+ "\r\n"
				+ "<body>");
		writer.println("    <form action=\"saveFile\" method=\"post\">");
		writer.println("<textarea id=\"editor\" name=\"editor\" cols=\"20\" rows=\"8\">"+text+"</textarea>");
		writer.println(" <input type=\"hidden\" value="+path+" name=\"path\">");
		writer.println("        <button type=\"submit\" id=\"save\">Save</button>");
		writer.println("    </form>");
		writer.println("");
		writer.println("</body>\r\n"
				+ "\r\n"
				+ "</html>");
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
