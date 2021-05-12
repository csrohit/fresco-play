

import java.io.BufferedWriter;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class SaveFile
 */
@WebServlet("/SaveFile")
public class SaveFile extends HttpServlet {
	private static final long serialVersionUID = 1L;
    FileOutputStream out = null;
    /**
     * Default constructor. 
     */
    public SaveFile() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException, ServletException, IOException {
		String content = request.getParameter("editor");
		String path = request.getParameter("path");
	    BufferedWriter writer = new BufferedWriter(new FileWriter("./file.txt"));
	    writer.write(content);
	    writer.close();

	}


}
