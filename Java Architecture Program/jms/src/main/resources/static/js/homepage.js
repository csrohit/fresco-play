function view_my_repos(){
	document.getElementById('create_new_repo_div').style.display = "none";
	document.getElementById('view_all_repos_div').style.display = "none";
	document.getElementById('view_my_repos_div').style.display = "block";
}

function create_new_repo(){
	document.getElementById('view_my_repos_div').style.display = "none";
	document.getElementById('view_all_repos_div').style.display = "none";
	document.getElementById('create_new_repo_div').style.display = "block";
}

function view_all_repos(){
	document.getElementById('create_new_repo_div').style.display = "none";
	document.getElementById('view_my_repos_div').style.display = "none";
	document.getElementById('view_all_repos_div').style.display = "block";
}
