package com.blog.blog_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .cors() // Enable CORS integration
                .and()
                .authorizeHttpRequests()
                .requestMatchers("/api/auth/**").permitAll() // Allow access to authentication endpoints
                .anyRequest().authenticated(); // Protect other endpoints

        return http.build();
    }
}
