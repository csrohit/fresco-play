function uploadCode(){
	document.getElementById('upload_code_btn').style.display = "none";
	document.getElementById('view_code_div').style.display = "none";
	document.getElementById('view_code_btn').style.display = "block";
	document.getElementById('upload_code_div').style.display = "block";
	document.getElementById('add_developer_btn').style.display = "block";
	document.getElementById('add_developer_div').style.display = "none";
}

function viewCode(){
	document.getElementById('view_code_btn').style.display = "none";
	document.getElementById('upload_code_btn').style.display = "block";
	document.getElementById('upload_code_div').style.display = "none";
	document.getElementById('view_code_div').style.display = "block";
	document.getElementById('add_developer_btn').style.display = "block";
	document.getElementById('add_developer_div').style.display = "none";
}

function addDeveloper(){
	document.getElementById('view_code_btn').style.display = "block";
	document.getElementById('upload_code_btn').style.display = "block";
	document.getElementById('upload_code_div').style.display = "none";
	document.getElementById('view_code_div').style.display = "none";
	document.getElementById('add_developer_btn').style.display = "none";
	document.getElementById('add_developer_div').style.display = "block";
}
