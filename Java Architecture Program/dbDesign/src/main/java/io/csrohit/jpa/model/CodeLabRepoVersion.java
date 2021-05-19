package io.csrohit.jpa.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

@Entity
public class CodeLabRepoVersion {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	private Integer version;
	private Long versionOwnerId;
	private Boolean isMaster;
	private Boolean isMrPending;
	@JsonIgnore
	@ManyToOne()
	@JoinColumn(name = "repo_id")
	private CodeLabRepo repo;

	public CodeLabRepo getRepo() {
		return repo;
	}

	public void setRepo(CodeLabRepo repo) {
		this.repo = repo;
	}

	public CodeLabRepoVersion() {
		super();
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

	public Long getVersionOwnerId() {
		return versionOwnerId;
	}

	public void setVersionOwnerId(Long versionOwnerId) {
		this.versionOwnerId = versionOwnerId;
	}

	public Boolean getMaster() {
		return isMaster;
	}

	public void setMaster(Boolean master) {
		isMaster = master;
	}

	public Boolean getMrPending() {
		return isMrPending;
	}

	public void setMrPending(Boolean mrPending) {
		isMrPending = mrPending;
	}
}
