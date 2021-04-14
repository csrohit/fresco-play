package com.csrohit.cantabilerest.consume;

public class Response{
	private News results[];
	private String section;

	 public String getSection() {
		 return section;
	 }

	 public void setSection(String section) {
		 this.section = section;
	 }

	 public Response() {
	 }

	 public News[] getResults() {
		 return results;
	 }

	 public void setResults(News[] results) {
		 this.results = results;
	 }
 }
