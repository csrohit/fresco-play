

import java.io.IOException;
import java.io.PrintWriter;

import jakarta.*;
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
//		request.getRequestDispatcher("view.jsp").forward(request, response);
		PrintWriter writer = response.getWriter();
		writer.println("<!DOCTYPE html>\r\n"
				+ "<html>\r\n"
				+ "<head>\r\n"
				+ "<meta charset=\"ISO-8859-1\">\r\n"
				+ "<title>EditFile</title>\r\n"
				+ "</head>\r\n"
				+ "<body>");
		writer.println("<form name=f1 method=\"get\" action=\"SaveFile\">");
		writer.println("<textarea rows=\"5\" cols=\"20\" id=\"editor\" name=\"editor\"></textarea>");
		writer.println("<input type=\"hidden\" value=\"" + request.getParameter("path") + "\" name=\"path\" id=\"path\">");
		writer.println("<button id=\"save\">Submit</button>");
		writer.println("</form>");
		writer.println("</body>\r\n"
				+ "</html>");
	}

}
