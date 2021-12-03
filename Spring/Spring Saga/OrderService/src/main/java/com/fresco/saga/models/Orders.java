package com.fresco.saga.models;

import java.sql.Date;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Orders {
	@Id
	int orderId;
	int orderSize;
	Date orderDate;
	double orderPrice;
	String orderOwner;
	OrderStatus orderStatus;
	
	public Orders() {
		super();
		this.orderStatus = OrderStatus.PAYMENT_PENDING;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public int getOrderSize() {
		return orderSize;
	}

	public void setOrderSize(int orderSize) {
		this.orderSize = orderSize;
	}

	public Date getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(Date orderDate) {
		this.orderDate = orderDate;
	}

	public double getOrderPrice() {
		return orderPrice;
	}

	public void setOrderPrice(double orderPrice) {
		this.orderPrice = orderPrice;
	}

	public String getOrderOwner() {
		return orderOwner;
	}

	public void setOrderOwner(String orderOwner) {
		this.orderOwner = orderOwner;
	}

	public OrderStatus getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(OrderStatus orderStatus) {
		this.orderStatus = orderStatus;
	}

	@Override
	public String toString() {
		return "Orders [orderId=" + orderId + ", orderSize=" + orderSize + ", orderDate=" + orderDate + ", orderPrice="
				+ orderPrice + ", orderOwner=" + orderOwner + ", orderStatus=" + orderStatus + "]";
	}

}