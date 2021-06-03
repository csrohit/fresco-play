package com;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import javax.swing.text.Element;

@MultipartConfig
public class FileUploadServlet extends HttpServlet {

	private static final long serialVersionUID = 102831973239L;

	private static final String UPLOAD_DIR = "D:/STS/tmp/";

	/*****
	 * This Method Is Called By The Servlet Container To Process A 'POST' Request
	 *****/
	public void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		handleRequest(request, response);
	}

	public void handleRequest(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {
		System.out.println("Here");
		String uploadFilePath = UPLOAD_DIR;

		File fileSaveDir = new File(uploadFilePath);
		if (!fileSaveDir.exists()) {
			fileSaveDir.mkdirs();
		}
		for (Part part : request.getParts()) {
			File f = new File(getFileName(part));

			part.write(uploadFilePath + File.separator + f.getName());
		}

		response.sendRedirect("fileuploadResponse.jsp");

	}

	private String getFileName(Part part) {
		String contentDisp = part.getHeader("content-disposition");
		String[] tokens = contentDisp.split(";");
		for (String token : tokens) {
			if (token.trim().startsWith("filename")) {
				return token.substring(token.indexOf("=") + 2, token.length() - 1);
			}
		}
		return "";
	}

}