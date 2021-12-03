package com.example.project.controllers;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.project.Models.User;
import com.example.project.service.UserService;

@RestController
@RequestMapping("user")
public class UserController {

    @Autowired
    private UserService userService;

	@GetMapping()
    public ResponseEntity<List<User>> findAll() throws ParseException {
        String s = "27/05/2022";
        SimpleDateFormat sd = new SimpleDateFormat("dd/MM/yyyy");
        Date date1 = sd.parse(s);
        System.out.println(date1);
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping()
    public ResponseEntity<User> save(@RequestBody User user){
        return ResponseEntity.ok(userService.save(user));
    }

    @GetMapping("{id}")
    public ResponseEntity<User> findById(@PathVariable int id){
        User user = userService.findById(id).get();
        return ResponseEntity.ok(user);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteById(@PathVariable int id){
        userService.delete(id);
        return new ResponseEntity(HttpStatus.OK);
    }
}
