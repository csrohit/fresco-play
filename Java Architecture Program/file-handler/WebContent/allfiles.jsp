<%@page import="java.io.File"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>


<%
File directoryPath = new File(application.getRealPath("files"));
//List of all files and directories
File contents[] = directoryPath.listFiles();
%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Download file</title>
</head>
<body>
	<h1>Uploaded Files</h1>

	<table>

		<tr>
			<th>File Name</th>
			<th>File Size</th>
			<th>Actions</th>
		</tr>
		<%
		for (File file : contents) {

			out.println("<tr>");
			out.println();

			out.print("<td>" + file.getName() + "</td>");

			out.println("<td>"+file.length()/1024+"KB</td>");
			out.print("<td><a href=\""
			+ request.getContextPath() + "/downloadServlet?fileName=" + file.getName()
			+ " \">Download</a></td>");


			out.println("</tr>");
		}
		%>
	</table>


	<a href="<%=request.getContextPath()%>">Back</a>
</body>
</html>