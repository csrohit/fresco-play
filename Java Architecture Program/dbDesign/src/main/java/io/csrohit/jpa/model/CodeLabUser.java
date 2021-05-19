package io.csrohit.jpa.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.*;

@Entity
public class CodeLabUser {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long userAutoGenId;
	private String fullname;
	private String username;
	private String password;

	@ManyToMany(cascade = { CascadeType.ALL }, fetch = FetchType.EAGER)
	@JoinTable(
			name = "repo_developers",
			joinColumns = { @JoinColumn(name = "user_id") },
			inverseJoinColumns = { @JoinColumn(name = "repo_id") }
	)
	Set<CodeLabRepo> repos = new HashSet<>();
	public CodeLabUser() {
		super();
	}
	public Long getUserAutoGenId() {
		return this.userAutoGenId;
	}
	public String getFullname() {
		return this.fullname;
	}

	public String getUsername() {
		return this.username;
	}
	public String getPassword() {
		return password;
	}
	public Object getVersionOwnerId() {
		return null;
	}
	public Object getId() {
		return null;
	}

	public Set<CodeLabRepo> getRepos() {
		return repos;
	}

	public void setRepos(Set<CodeLabRepo> repos) {
		this.repos = repos;
	}

	public void setFullname(String fullname) {
		this.fullname = fullname;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public CodeLabRepo getRepo() {
		return null;
	}

	public void addRepo(CodeLabRepo repo) {
		repos.add(repo);
	}
}
