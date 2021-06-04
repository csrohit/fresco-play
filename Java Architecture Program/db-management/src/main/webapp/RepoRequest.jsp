<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ page import="java.sql.*,java.io.*,java.util.*" %>

<!DOCTYPE html>
<html>
<%@ include file = "Header.jsp" %>
<h1>Create Repo</h1>
<form action="/CreateRepo" method="post">
UserId:<input type="text" id="userId" name="userId"/><br/>
RepoName:<input type="text" id="RepoName" name="RepoName"/><br/>
RepoDesc:<input type="text" id="RepoDesc" name="RepoDesc"/><br/>
RepoDev:<input type="text" id="RepoDev" name="RepoDev"/><br/>
<input type="Submit" id="create" value="submit"/>
</form>
</html>