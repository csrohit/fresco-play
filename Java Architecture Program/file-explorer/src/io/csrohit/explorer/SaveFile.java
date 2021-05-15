package io.csrohit.explorer;

import java.io.BufferedWriter;
import java.io.FileWriter;
import java.io.IOException;
import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

/**
 * Servlet implementation class SaveFile
 */
@WebServlet("/saveFile")
public class SaveFile extends HttpServlet {
	private static final long serialVersionUID = 1L;

    /**
     * Default constructor. 
     */
    public SaveFile() {
        // TODO Auto-generated constructor stub
    }
    
    

	@Override
	protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
		// TODO Auto-generated method stub
		resp.getWriter().println("abcd");
	}



	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(jakarta.servlet.http.HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String path = request.getParameter("path");
		String editor = request.getParameter("editor");
		System.out.println(editor);

		BufferedWriter writer = new BufferedWriter(new FileWriter(path));
		writer.write(editor.trim());
		writer.close();
		response.getWriter().print("File Saved");
	}

}
