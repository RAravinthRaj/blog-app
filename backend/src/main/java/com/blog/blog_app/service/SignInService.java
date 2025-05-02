package com.blog.blog_app.service;

import com.blog.blog_app.dto.SignInRequest;
import com.blog.blog_app.model.SignUpModel;
import com.blog.blog_app.repository.SignUpRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.util.Optional;

@Service
public class SignInService {

    private static final Logger logger = LoggerFactory.getLogger(SignInService.class);

    @Autowired
    private SignUpRepository userRepository;

    public boolean validateUser(SignInRequest signInRequest) {
        logger.info("Validating user with email: {}", signInRequest.getEmail());

        Optional<SignUpModel> userOptional = userRepository.findByEmail(signInRequest.getEmail());

        if (userOptional.isPresent()) {
            SignUpModel user = userOptional.get();

            return user.getPassword().equals(signInRequest.getPassword());
        }

        logger.warn("User with email {} not found", signInRequest.getEmail());
        return false;
    }
}