package com.fresco.codelab.jms;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class MergeRequest{
	@Id
	@GeneratedValue
    private Long mergeReqId;
    private Long repoId;
    private Integer version;
    private String reqFrom;
    private String reqTo;
 
    public MergeRequest() {
    	super();
    }

	public MergeRequest(Long repoId, Integer version, String reqFrom, String reqTo) {
		super();
		this.repoId = repoId;
		this.version = version;
		this.reqFrom = reqFrom;
		this.reqTo = reqTo;
	}

	public Long getMergeReqId() {
		return mergeReqId;
	}

	public Long getRepoId() {
		return repoId;
	}

	public void setRepoId(Long repoId) {
		this.repoId = repoId;
	}

	public Integer getVersion() {
		return version;
	}

	public void setVersion(Integer version) {
		this.version = version;
	}

	public String getReqFrom() {
		return reqFrom;
	}

	public void setReqFrom(String reqFrom) {
		this.reqFrom = reqFrom;
	}

	public String getReqTo() {
		return reqTo;
	}

	public void setReqTo(String reqTo) {
		this.reqTo = reqTo;
	}

	@Override
	public String toString() {
		return "MergeRequest [mergeReqId=" + mergeReqId + ", repoId=" + repoId + ", version=" + version + ", reqFrom="
				+ reqFrom + ", reqTo=" + reqTo + "]";
	}
}