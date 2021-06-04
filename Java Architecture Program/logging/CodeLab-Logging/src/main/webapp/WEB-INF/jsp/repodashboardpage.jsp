<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" href="/css/repodashboard.css">

</head>
<body>
	<div class="header">
		<span id="repoName">"${repoOwner.username}"</span>
		<span id="repoName">"${repo.repoName}"</span>
		<button id="view_code_btn" onclick="viewCode()" style="display:none">View Code</button>
		<button id="upload_code_btn" onclick="uploadCode()">Upload Code</button>
		<c:if test = "${repo.repoOwnerId == loggedInUser}">
			<button id="add_developer_btn" onclick="addDeveloper()">Add Developer</button>
		</c:if>
	</div>
	<div class="container">
		<div id="view_code_div">
			<c:forEach items="${repo.versions}" var="version">
				<a class="repo-version-link" href="/dashboard/openrepo/${repo.repoAutoGenId}/version/${version.version}">
					<div class="repo-version-div">
						<c:out value="> ${repo.repoName} - version ${version.version} " />
					</div>
				</a>
				<c:if test = "${version.isMaster}">
					<div>Master</div>
				</c:if>
				<c:if test = "${version.versionOwnerId == loggedInUser}">
					<c:if test = "${!version.isMrPending && !version.isMaster}">
						<div onclick="sendMR('${repoOwner.username}', ${repo.repoAutoGenId},
								 ${version.version}, '${loggedInUsername}', this)">Make MR</div>
					</c:if>
					<c:if test = "${version.isMrPending}">
						<div>MR Pending</div>
					</c:if>
				</c:if>
			</c:forEach>
		</div>
		<div id="upload_code_div" style="display:none">
			<form method="POST" action="/dashboard/uploadcode/${repo.repoAutoGenId}" enctype="multipart/form-data">
    			<input type="file" name="file" accept=".zip"/><br/><br/>
    			<input type="submit" value="Upload" />
			</form>
		</div>
		<c:if test = "${repo.repoOwnerId == loggedInUser}">
			<div id="add_developer_div" style="display:none">
				<form method="POST" action="/dashboard/adddeveloper/${repo.repoAutoGenId}">
    				<input list="developers" name="developer">
  					<datalist id="developers">
    					<c:forEach items="${developers}" var="dev">
    						<option value="${dev.username}">
						</c:forEach>
					</datalist>
    				<input type="submit" value="Add Developer" />
				</form>
			</div>
		</c:if>
	</div>
	 <%@ include file="notifications.html" %>
	<script src="/js/repodashboard.js"></script>
</body>
</html>