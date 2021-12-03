package com.fresco.saga.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;

@Controller("/")
public class PaymentController {
	@PostMapping("make_payment")
	public ResponseEntity<String> makePayment() {
		return null;
	}
}
