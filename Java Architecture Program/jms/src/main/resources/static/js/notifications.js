function openNotifications(){
	var ele = document.querySelector("#notification-panel");
	var flag = ele.style.display;
	ele.style.display = (flag == "none" ? "block" : "none");
	
}

var stompClient = null;

function disconnect() {
    if(stompClient != null) {
        stompClient.disconnect();
    }
    console.log("Disconnected");
}
 
function sendMR(repoOwnerUsername, repoId, version,username, ele) {
    stompClient.send("/app/queue/sendMR", {}, 
      JSON.stringify({'reqTo':repoOwnerUsername, 'repoId':repoId, 'version':version, 'reqFrom':username}));
    stompClient.send("/app/queue/sendMR", {}, 
    	      JSON.stringify({'reqTo':username, 'repoId':repoId, 'version':version, 'reqFrom':username}));
    ele.style.display = "none";
}
 
function showMessageOutput(messageOutput) {
	location.reload();
}

function connect() {
	var socket = new SockJS('/mergeRequest');
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function (frame) {
		stompClient.subscribe("/user/queue/receiveMR", function(messageOutput) {
            showMessageOutput(JSON.parse(messageOutput.body));
        });
	});
}

function MRAction(repoId, version, flag){
	fetch("/dashboard/mraction/" + repoId + "/" + version + "/" + flag).then(function(response) {
		  return response.json();
		}).then(function(data) {
			location.reload();
		}).catch(function() {
		  console.log("Booo");
		});
}

function addNotifications(data){
	if(data.length > 0){
		document.querySelector("#notification-btn").style.background = "skyblue";
		panel = document.querySelector("#notification-panel");
		ele = document.createElement('table');
		table = ele.createTBody();
		for(req in data){
			row = table.insertRow();
			span = document.createElement('span');
			span.innerText = "MR from " + data[req].reqFrom + " for " + data[req].repoId + "-" + data[req].version;
			row.insertCell().append(span);
			btn = document.createElement('button');
			btn.innerText = "OK";
			btn.onclick = function() { MRAction(data[req].repoId, data[req].version,1); }
			row.insertCell().append(btn);
			btn = document.createElement('button');
			btn.innerText = "Deny";
			btn.onclick = function() { MRAction(data[req].repoId, data[req].version,0); }
 			row.insertCell().append(btn);
		}
		// document.querySelector("#notification-panel").innerHtml = "";
		document.querySelector("#notification-panel").append(ele);
	}
	else
		document.querySelector("#notification-btn").style.background = "white";
}

function getNotifications(){
	fetch("/dashboard/getmergerequests").then(function(response) {
		  return response.json();
		}).then(function(data) {
		  addNotifications(data);
		}).catch(function() {
		  console.log("Booo");
		});
}

connect();
getNotifications();
