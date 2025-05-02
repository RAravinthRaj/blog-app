package com.blog.blog_app.controller;

import com.blog.blog_app.dto.SignUpRequest;
import com.blog.blog_app.model.User;
import com.blog.blog_app.repository.userRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private userRepository userRepository;

    @PostMapping("/signup")
    public String signup(@RequestBody SignUpRequest signupRequest) {
        if (userRepository.existsByEmail(signupRequest.getEmail())) {
            return "Email already in use!";
        }

        User user = new User();
        user.setUsername(signupRequest.getUsername());
        user.setEmail(signupRequest.getEmail());
        user.setPassword(signupRequest.getPassword());

        userRepository.save(user);

        return "User registered successfully!";
    }
}
