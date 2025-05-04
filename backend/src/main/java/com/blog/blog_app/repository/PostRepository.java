package com.blog.blog_app.repository;

import com.blog.blog_app.model.PostModel;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostModel, Long> {
    List<PostModel> findByUserId(Long userId);

    List<PostModel> findByCategory(String category);

    Page<PostModel> findByCategory(String category, Pageable pageable);

    Page<PostModel> findByTitleContainingIgnoreCase(String keyword, Pageable pageable);

    @Modifying
    @Transactional
    @Query("UPDATE PostModel p SET p.likes = p.likes + 1 WHERE p.id = :id")
    void incrementLikes(Long id);

    @Modifying
    @Transactional
    @Query("UPDATE PostModel p SET p.likes = p.likes - 1 WHERE p.id = :postId AND p.likes > 0")
    void decrementLikes(Long postId);
}