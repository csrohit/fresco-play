package com.fresco.codelab.model;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;

@Entity
public class CodeLabRepo {
	@Id
	@GeneratedValue
	@Column(name = "repo_id")
	private Long repoAutoGenId;
	private String repoName;
	private Long repoOwnerId;
	@OneToMany(mappedBy="repo")
	private List<CodeLabRepoVersion> versions;
	@ManyToMany(mappedBy = "repos")
	private List<CodeLabUser> repoDevelopers;
	public CodeLabRepo() {
		super();
	}
	public CodeLabRepo(String repoName, Long repoOwnerId, ArrayList<CodeLabUser> repoDevelopers, List<CodeLabRepoVersion> versions) {
		super();
		this.repoName = repoName;
		this.repoOwnerId = repoOwnerId;
		this.repoDevelopers = repoDevelopers;
		this.versions = versions;
	}
	public Long getRepoAutoGenId() {
		return repoAutoGenId;
	}
	public String getRepoName() {
		return repoName;
	}
	public Long getRepoOwnerId() {
		return repoOwnerId;
	}
	public List<CodeLabUser> getRepoDevelopers() {
		return repoDevelopers;
	}
	public void setRepoName(String repoName) {
		this.repoName = repoName;
	}
	public void setRepoOwnerId(Long repoOwnerId) {
		this.repoOwnerId = repoOwnerId;
	}
	public void setRepoDevelopers(List<CodeLabUser> repoDevelopers) {
		this.repoDevelopers = repoDevelopers;
	}
	public List<CodeLabRepoVersion> getVersions() {
		return versions;
	}
	public void setVersions(List<CodeLabRepoVersion> versions) {
		this.versions = versions;
	}
	@Override
	public String toString() {
		return "CodeLabRepo [repoAutoGenId=" + repoAutoGenId + ", repoName=" + repoName + ", repoOwnerId=" + repoOwnerId
				+ ", versions=" + versions + ", repoDevelopers=" + repoDevelopers + "]";
	}
}