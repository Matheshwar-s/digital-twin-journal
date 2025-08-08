package com.digitalTwin.backend.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.digitalTwin.backend.entity.User;
import com.digitalTwin.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") // Adjust to your frontend port
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        try {
            User createdUser = userService.registerUser(user);
            return ResponseEntity.ok(createdUser);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Username already exists");
        }
    }

    @PostMapping("/login")
public ResponseEntity<?> loginUser(@RequestBody User user) {
    Optional<User> authenticatedUser = userService.authenticate(user.getUsername(), user.getPassword());

    if (authenticatedUser.isPresent()) {
        return ResponseEntity.ok(authenticatedUser.get());
    } else {
        return ResponseEntity.status(401).body("Invalid credentials");
    }
}

}

