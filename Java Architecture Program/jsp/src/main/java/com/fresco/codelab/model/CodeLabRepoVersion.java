package com.fresco.codelab.model;

public class CodeLabRepoVersion {
	public Integer id;
	public Integer version;
	public CodeLabRepo repo;
	public Long versionOwnerId;
	public Boolean isMaster;
	public Boolean isMrPending;
	public CodeLabRepoVersion() {
		super();
	}
	public CodeLabRepoVersion(Integer id, Integer version, CodeLabRepo repo, Long versionOwnerId) {
		super();
		this.id = id;
		this.version = version;
		this.repo = repo;
		this.versionOwnerId = versionOwnerId;
		this.isMaster = false;
		this.isMrPending = false;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getVersion() {
		return version;
	}
	public void setVersion(Integer version) {
		this.version = version;
	}
	public CodeLabRepo getRepo() {
		return repo;
	}
	public void setRepo(CodeLabRepo repo) {
		this.repo = repo;
	}
	public Long getVersionOwnerId() {
		return versionOwnerId;
	}
	public void setVersionOwnerId(Long versionOwnerId) {
		this.versionOwnerId = versionOwnerId;
	}
	public Boolean getIsMaster() {
		return isMaster;
	}
	public void setIsMaster(Boolean isMaster) {
		this.isMaster = isMaster;
	}
	public Boolean getIsMrPending() {
		return isMrPending;
	}
	public void setIsMrPending(Boolean isMrPending) {
		this.isMrPending = isMrPending;
	}
}
