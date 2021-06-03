package com.fresco.codelab.model;

import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;

@Entity
public class CodeLabUser {
	@Id
	@GeneratedValue
	private Long userAutoGenId;
	private String fullname;
	@Column(unique=true)
	private String username;
	private String password;
	@ManyToMany
	@JoinTable(
			  name = "assigned_repos", 
			  joinColumns = @JoinColumn(name = "userAutoGenId"), 
			  inverseJoinColumns = @JoinColumn(name = "repoAutoGenId"))
	private Set<CodeLabRepo> repos;
	public CodeLabUser() {
		super();
	}
	public CodeLabUser(String fullname, String username, String password, Set<CodeLabRepo> repos) {
		super();
		this.fullname = fullname;
		this.username = username;
		this.password = password;
		this.repos = repos;
	}

	public Long getUserAutoGenId() {
		return userAutoGenId;
	}
	public String getUsername() {
		return username;
	}
	public String getPassword() {
		return password;
	}
	public String getFullname() {
		return fullname;
	}
	public void setUsername(String username) {
		this.username = username;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public void setFullname(String fullname) {
		this.fullname = fullname;
	}
	public Set<CodeLabRepo> getRepos() {
		return repos;
	}
	public void setRepos(Set<CodeLabRepo> repos) {
		this.repos = repos;
	}
	@Override
	public String toString() {
		return "CodeLabUser [userAutoGenId=" + userAutoGenId + ", fullname=" + fullname + ", username=" + username
				+ ", password=" + password + ", repos=" + repos + "]";
	}
}
