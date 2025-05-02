package com.blog.blog_app.repository;

import com.blog.blog_app.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface userRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}
