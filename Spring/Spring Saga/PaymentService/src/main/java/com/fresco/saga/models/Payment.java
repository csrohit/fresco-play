package com.fresco.saga.models;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Payment {
	@Id
	int paymentId;
	int orderId;
	double orderPrice;
	PaymentStatus paymentStatus;
	
	public Payment() {
		super();
		this.paymentStatus = PaymentStatus.PAYMENT_PENDING;
	}

	public Payment(int orderId, double orderPrice) {
		super();
		this.orderId = orderId;
		this.orderPrice = orderPrice;
		this.paymentStatus = PaymentStatus.PAYMENT_PENDING;
	}

	public int getPaymentId() {
		return paymentId;
	}

	public void setPaymentId(int paymentId) {
		this.paymentId = paymentId;
	}

	public int getOrderId() {
		return orderId;
	}

	public void setOrderId(int orderId) {
		this.orderId = orderId;
	}

	public double getOrderPrice() {
		return orderPrice;
	}

	public void setOrderPrice(double orderPrice) {
		this.orderPrice = orderPrice;
	}

	public PaymentStatus getPaymentStatus() {
		return paymentStatus;
	}

	public void setPaymentStatus(PaymentStatus orderStatus) {
		this.paymentStatus = orderStatus;
	}

	@Override
	public String toString() {
		return "Payment [paymentId=" + paymentId + ", orderId=" + orderId + ", orderPrice=" + orderPrice
				+ ", paymentStatus=" + paymentStatus + "]";
	}

}