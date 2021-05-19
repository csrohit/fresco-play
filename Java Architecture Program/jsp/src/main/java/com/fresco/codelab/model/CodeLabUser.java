package com.fresco.codelab.model;

import java.util.List;

public class CodeLabUser {
	public Long userAutoGenId;
	public String fullname;
	public String username;
	public String password;
	public List<CodeLabRepo> repos;
	CodeLabUser() {
		super();
	}
	public CodeLabUser(Long userAutoGenId, String fullname, String username, String password, List<CodeLabRepo> repos) {
		super();
		this.userAutoGenId = userAutoGenId;
		this.fullname = fullname;
		this.username = username;
		this.password = password;
		this.repos = repos;
	}
	public Long getUserAutoGenId() {
		return userAutoGenId;
	}
	public void setUserAutoGenId(Long userAutoGenId) {
		this.userAutoGenId = userAutoGenId;
	}
	public String getFullname() {
		return fullname;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public List<CodeLabRepo> getRepos() {
		return repos;
	}
	public void setRepos(List<CodeLabRepo> repos) {
		this.repos = repos;
	}
}
