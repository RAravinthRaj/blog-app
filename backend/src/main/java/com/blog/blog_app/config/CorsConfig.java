package com.blog.blog_app.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                // Allow requests from localhost:5173 (frontend)
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173") // Specify allowed frontend origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                        .allowedHeaders("Content-Type", "Authorization", "Origin", "X-Requested-With", "Accept",
                                "Access-Control-Allow-Headers")
                        .allowCredentials(true); // Allow cookies/sessions
            }
        };
    }
}
