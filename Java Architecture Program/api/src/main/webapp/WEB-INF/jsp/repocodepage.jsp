<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
<link rel="stylesheet" href="/css/repocode.css">
</head>
<body>
	<div class="header">
		<span id="repo-name">"${repo.repoName}"</span>
		<span id="repo-version">"${version}"</span>
	</div>
	<div class="container">
		<div id="repo_code_div">
			<c:forEach items="${repoCode}" var="code">
				<div>
					<div class="code-editor-link" onclick="javascript:openEditor(this)">
						 ${code.key.substring(code.key.indexOf('/') + 1)}
						 <span>${code.value.get(0)} bytes</span>
					</div>
					<div class="code-editor">
						<form action="/dashboard/savecode/${repo.repoAutoGenId}/${version}" method=POST>
							<span>${code.key.substring(code.key.indexOf('/') + 1)}</span>
							<input type=hidden name="reponame" value="${code.key}">
							<button type="submit">Save</button>
							<button type="reset" onclick="closeEditor(this)">Cancel</button>
							<textarea name="code">${code.value.get(1)}</textarea>
						</form>
					</div>
				</div>
			</c:forEach>
		</div>
	</div>
	<%@ include file="notifications.html" %>
	<script src="/js/repocode.js"></script>
</body>
</html>