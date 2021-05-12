<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
</head>
<body>
<form name=f1 method="get" action="SaveFile">
<textarea rows="5" cols="20" id="editor" name="editor"></textarea>
<input type="hidden" value="<%= request.getParameter("path") %>" name="path" id="save">
<button>Submit</button>
</form>
</body>
</html>