<%@page import="java.util.List"%>
<%@page import="java.io.File"%>
<%@page import="com.UploadedFilesServlet"%>
<%@page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<label>File Name</label>
<label>File Size</label>
<label>Action</label>
<%
	List<File> files = (List<File>) request.getAttribute("data");
for (File f : files) {
%>
<p><%=f.getName()%></p>
<p><%=f.length() / 1024%>
	KB
</p>
<a href="downloadServlet?fileName=<%= f.getName() %>">download </a>
<%
	}
%>
<a href="/index.jsp">Back</a>
</html>