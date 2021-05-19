<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>

	<h1>Dashboard</h1>
	<c:if test="${not empty allrepos}">

		<ul>
			<c:forEach var="listValue" items="${allrepos}">
				<li>${listValue.getRepoName()}</li>
			</c:forEach>
			<c:forEach var="listValue" items="${myrepos}">
				<li>${listValue.getRepoName()}</li>
			</c:forEach>
		</ul>

	</c:if>
	<h2>Upload code</h2>
	<form action="/dashboard/createnewrepo" method="post">

		<div class="form-group">
			<label for="username">Repo name:</label> <input type="text"
				name="repo_name" id="repo_name">
		</div>

		<input type="submit" name="create_repo_btn">Submit
		</button>


	</form>
</body>
</html>