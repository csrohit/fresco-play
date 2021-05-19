package com.fresco.codelab.model;

import java.util.List;

public class CodeLabRepo {
	public Long repoAutoGenId;
	public String repoName;
	public Long repoOwnerId;
	public List<CodeLabRepoVersion> versions;
	public List<CodeLabUser> repoDevelopers;
	public CodeLabRepo() {
		super();
	}
	public CodeLabRepo(Long repoAutoGenId, String repoName, Long repoOwnerId, List<CodeLabUser> repoDevelopers, List<CodeLabRepoVersion> versions) {
		super();
		this.repoAutoGenId = repoAutoGenId;
		this.repoName = repoName;
		this.repoOwnerId = repoOwnerId;
		this.repoDevelopers = repoDevelopers;
		this.versions = versions;
	}
	public Long getRepoAutoGenId() {
		return repoAutoGenId;
	}
	public void setRepoAutoGenId(Long repoAutoGenId) {
		this.repoAutoGenId = repoAutoGenId;
	}
	public String getRepoName() {
		return repoName;
	}
	public void setRepoName(String repoName) {
		this.repoName = repoName;
	}
	public Long getRepoOwnerId() {
		return repoOwnerId;
	}
	public void setRepoOwnerId(Long repoOwnerId) {
		this.repoOwnerId = repoOwnerId;
	}
	public List<CodeLabRepoVersion> getVersions() {
		return versions;
	}
	public void setVersions(List<CodeLabRepoVersion> versions) {
		this.versions = versions;
	}
	public List<CodeLabUser> getRepoDevelopers() {
		return repoDevelopers;
	}
	public void setRepoDevelopers(List<CodeLabUser> repoDevelopers) {
		this.repoDevelopers = repoDevelopers;
	}
	
}