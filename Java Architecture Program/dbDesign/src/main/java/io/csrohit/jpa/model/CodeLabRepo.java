package io.csrohit.jpa.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity
public class CodeLabRepo {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long repoAutoGenId;
	private String repoName;
	private Long repoOwnerId;


	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL, mappedBy = "repos")
	private List<CodeLabUser> repoDevelopers = new ArrayList<>();

	@OneToMany(mappedBy = "repo")
	private List<CodeLabRepoVersion> versions;



	public CodeLabRepo() {
		super();
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

	public void addDeveloper(CodeLabUser user){
		repoDevelopers.add(user);
	}

	public Long getRepoAutoGenId() {
		return repoAutoGenId;
	}
	public String getRepoName() {
		return repoName;
	}
	public List<CodeLabUser> getRepoDevelopers() {
		return repoDevelopers;
	}
	public List<CodeLabRepoVersion> getVersions() {
		return this.versions;
	}
	public void addVersion(CodeLabRepoVersion version){
		versions.add(version);
	}

	public void setVersions(List<CodeLabRepoVersion> versions) {
		this.versions = versions;
	}
}
