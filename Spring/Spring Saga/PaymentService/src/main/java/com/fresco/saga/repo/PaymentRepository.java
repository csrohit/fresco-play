package com.fresco.saga.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fresco.saga.models.Payment;

public interface PaymentRepository extends JpaRepository<Payment, Integer>{
	public List<Payment> findAllByOrderId(int orderId);
}
