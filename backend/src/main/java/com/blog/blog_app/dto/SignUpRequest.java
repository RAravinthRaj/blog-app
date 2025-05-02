package com.blog.blog_app.dto;

import lombok.Data;

@Data
public class SignUpRequest {
    private String username;
    private String email;
    private String password;
}
