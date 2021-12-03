package com.fresco.saga.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fresco.saga.models.Orders;

public interface OrderRepository extends JpaRepository<Orders, Integer>{

}
