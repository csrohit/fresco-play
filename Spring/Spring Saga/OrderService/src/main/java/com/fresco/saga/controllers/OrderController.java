package com.fresco.saga.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.fresco.saga.models.Orders;

@Controller("/")
public class OrderController {

	@PostMapping("create_order")
	public ResponseEntity<String> createOrder(@RequestBody Orders newOrder) {
		return null;
	}

	@GetMapping("finish_order/{orderId}")
	public ResponseEntity<String> finishOrder(@PathVariable int orderId) {
		return null;
	}

	@GetMapping("cancel_order/{orderId}")
	public ResponseEntity<String> cancelOrder(@PathVariable int orderId) {
		return null;
	}
}
