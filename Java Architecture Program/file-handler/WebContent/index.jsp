<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body style="text-align:center">
	<h1>Upload Files</h1>

	<form action="fileUploadServlet" method="POST" enctype="multipart/form-data">
		<input type="file" name="fileName" size="50" id="fileAttachment" /> <br />
		<button type="submit" id="uploadBtn">Upload</button>

	</form>
	
	<a href="<%=request.getContextPath()%>/uploadedFilesServlet">List all uploaded files</a>
</body>
</html>