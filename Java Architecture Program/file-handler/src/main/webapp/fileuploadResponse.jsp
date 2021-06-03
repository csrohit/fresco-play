<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<h1>File Upload</h1>
<p>Press "CTRL" Key+Click on File To Select Multiple Files in Open
	Dialog</p>
<form action="fileUploadServlet" method="post"
	enctype="multipart/form-data">
	<label>Upload File</label> <input type="file" name="files"
		multiple="multiple" /> <br /> <input type="submit" value="Upload"><br />
	<a href="/uploadedFilesServlet">List all uploaded files</a>
</form>
</html>
