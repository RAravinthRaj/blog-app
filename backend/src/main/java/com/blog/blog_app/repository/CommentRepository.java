package com.blog.blog_app.repository;

import com.blog.blog_app.model.Comment;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // Find comments by post id
    List<Comment> findByPostId(Long postId);

    // Find comments by post id with pagination
    Page<Comment> findByPostId(Long postId, Pageable pageable);

    // Find comments by user id
    List<Comment> findByUserId(Long userId);

    // Count comments by post id
    long countByPostId(Long postId);
}