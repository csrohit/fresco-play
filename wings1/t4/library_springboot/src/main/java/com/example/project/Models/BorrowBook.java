package com.example.project.Models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@Entity
public class BorrowBook {

	@Id
	private int id;
	
	
	private int userid;
	@OneToOne(targetEntity = Book.class)
	private Book book;
	@JsonDeserialize
	private Date bookingDate;
	private double chargePerDay;
	private int no_Of_Days;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public int getUserid() {
		return userid;
	}
	public void setUserid(int userid) {
		this.userid = userid;
	}
	public Book getBook() {
		return book;
	}
	public void setBook(Book book) {
		this.book = book;
	}
	public Date getBookingDate() {
		return bookingDate;
	}
	public void setBookingDate(Date bookingDate) {
		this.bookingDate = bookingDate;
	}
	public double getChargePerDay() {
		return chargePerDay;
	}
	public void setChargePerDay(double chargePerDay) {
		this.chargePerDay = chargePerDay;
	}
	public int getNo_Of_Days() {
		return no_Of_Days;
	}
	public void setNo_Of_Days(int no_Of_Days) {
		this.no_Of_Days = no_Of_Days;
	}
	public BorrowBook(int id, Date bookingDate, double chargePerDay, int no_Of_Days) {
		super();
		this.id = id;
		this.bookingDate = bookingDate;
		this.chargePerDay = chargePerDay;
		this.no_Of_Days = no_Of_Days;
	}
	public BorrowBook(int id, int userid, Book book, Date bookingDate, double chargePerDay, int no_Of_Days) {
		super();
		this.id = id;
		this.userid = userid;
		this.book = book;
		this.bookingDate = bookingDate;
		this.chargePerDay = chargePerDay;
		this.no_Of_Days = no_Of_Days;
	}
	public BorrowBook(int id, int userid, Date bookingDate, double chargePerDay, int no_Of_Days) {
		super();
		this.id = id;
		this.userid = userid;
	
		this.bookingDate = bookingDate;
		this.chargePerDay = chargePerDay;
		this.no_Of_Days = no_Of_Days;
	}
	public BorrowBook() {
		super();
	}
	
	
}
