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
			<input type="text" id="receiver-username" placeholder="Enter receiver username">
			<input type="text" id="msg" placeholder="Enter msg">
			<input type="button" id="send-btn" onclick="sendMR('${loggedInUsername}')" value="Send Msg">
		</div>
	</div>
	 <%@ include file="notifications.html" %>
	<script src="/js/homepage.js"></script>
</body>
</html>