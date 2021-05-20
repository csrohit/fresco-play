package com.fresco.codelab.model;

import javax.persistence.*;

@Entity
public class CodeLabRepoVersion {
	@Id
	@GeneratedValue
	private Integer id;
	private Integer version;
	@ManyToOne
	@JoinColumn(name="repo_id", nullable=false)
	private CodeLabRepo repo;
	private Long versionOwnerId;
	private Boolean isMaster;
	private Boolean isMrPending;
	public CodeLabRepoVersion() {
		super();
	}
	public CodeLabRepoVersion(Integer version, CodeLabRepo repo, Long versionOwnerId) {
		super();
		this.version = version;
		this.repo = repo;
		this.versionOwnerId = versionOwnerId;
		this.isMaster = false;
		this.isMrPending = false;
	}
	
	public Boolean getIsMrPending() {
		return isMrPending;
	}
	public void setIsMrPending(Boolean isMrPending) {
		this.isMrPending = isMrPending;
	}
	public Integer getId() {
		return id;
	}
	public void setVersion(Integer version) {
		this.version = version;
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
	public Integer getVersion() {
		return version;
	}
	public CodeLabRepo getRepo() {
		return repo;
	}
	public void setVersion(CodeLabRepo repo) {
		this.repo = repo;
	}
}
