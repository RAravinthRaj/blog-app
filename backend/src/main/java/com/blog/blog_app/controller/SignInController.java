package com.blog.blog_app.controller;

import com.blog.blog_app.dto.SignInRequest;
import com.blog.blog_app.service.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/auth")
public class SignInController {

    private static final Logger logger = LoggerFactory.getLogger(SignInController.class);

    @Autowired
    private SignInService signInService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/signin")
    public ResponseEntity<String> signin(@RequestBody SignInRequest signInRequest) {
        logger.info("Received signin request for email: {}", signInRequest.getEmail());

        try {
            boolean isValid = signInService.validateUser(signInRequest);

            if (isValid) {
                logger.info("User authenticated successfully: {}", signInRequest.getEmail());
                return ResponseEntity.ok("Authentication successful");
            } else {
                logger.warn("Authentication failed for email: {}", signInRequest.getEmail());
                return ResponseEntity.badRequest().body("Invalid email or password");
            }
        } catch (Exception e) {
            logger.error("Error during authentication: ", e);
            return ResponseEntity.internalServerError().body("Authentication failed: " + e.getMessage());
        }
    }
}