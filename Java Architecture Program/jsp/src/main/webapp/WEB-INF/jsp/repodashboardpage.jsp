<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
</head>
<body>
	<c:out value="${repo.getRepoName()}" />
	<c:out value="${repoOwner.getFullname()}" />

	<c:if test="${not empty repo.getVersions()}">

		<ul>
			<c:forEach var="listValue" items="${repo.getVersions()}">
				<li><c:out value="${repo.getRepoName()}" /> -> version
					${listValue.getVersion()}<br> <c:if
						test="${repoOwner.getFullname() == loggedInUsername}">
						Make Mr
					</c:if></li>
			</c:forEach>
		</ul>

	</c:if>
	version 1
	version 2
	<h2>Create Repo</h2>
	<form action="/dashboard/uploadcode/${repo.getRepoAutoGenId()}"
		method="post" enctype="multipart/form-data">

		<div class="form-group">
			<label for="file">File:</label> <input type="file" name="file"
				id="file">
		</div>

		<input type="submit" name="file_submit_btn">Upload
		</button>
	</form>
	<h2>Add developer</h2>
	<form action="/dashboard/adddeveloper/${repo.getRepoAutoGenId()}" method="post">

		<div class="form-group">
			<label for="developer">developer:</label> <input type="text"
				name="developer" id="developer">
		</div>

		<input type="submit" name="add_developer_btn">Submit
		</button>
</body>
</html>