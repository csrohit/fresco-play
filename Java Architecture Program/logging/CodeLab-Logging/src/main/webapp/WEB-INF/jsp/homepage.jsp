<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" href="/css/homepage.css">
</head>
<body>
	<div class="menu">
		<button id="view_my_repos_btn" onclick="view_my_repos()">View
			my repos</button>
		<button id="create_new_repo_btn" onclick="create_new_repo()">Create
			new repo</button>
		<button id="view_all_repos_btn" onclick="view_all_repos()">View
			all repos</button>
	</div>
	<div class="container">
		<div id="view_my_repos_div">
			<c:forEach items="${myrepos}" var="repo">
				<a class="repo-link" href="/dashboard/openrepo/${repo.repoAutoGenId}">
					<div class="repo-div">${repo.repoName}</div>
				</a>
			</c:forEach>
		</div>
		<div id="create_new_repo_div">
			<form action="/dashboard/createnewrepo" method=POST>
				<div class="container">
					<h1>Create new repo</h1>
					<hr>
					<label for="repo_name"><b>Repo Name</b></label> <input type="text"
						placeholder="Enter Repo Name" name="repo_name" required> <br>
					<hr>
					<button type="submit" class="createrepobtn">Create repo</button>
				</div>
			</form>
		</div>
		<div id="view_all_repos_div">
			<c:forEach items="${allrepos}" var="repo">
				<a class="repo-link" href="/dashboard/openrepo/${repo.repoAutoGenId}">
					<div class="repo-div">${repo.repoName}</div>
				</a>
			</c:forEach>
		</div>
	</div>
	 <%@ include file="notifications.html" %>
	<script src="/js/homepage.js"></script>
</body>
</html>