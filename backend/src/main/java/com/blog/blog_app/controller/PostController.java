package com.blog.blog_app.controller;

import com.blog.blog_app.dto.PostRequest;
import com.blog.blog_app.dto.PostResponse;
import com.blog.blog_app.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/posts")
public class PostController {

    private static final Logger logger = LoggerFactory.getLogger(PostController.class);

    @Autowired
    private PostService postService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping
    public ResponseEntity<?> createPost(@RequestBody PostRequest postRequest, @RequestParam("userId") int userId) {
        logger.info("Received request to create post with title: {} for user ID: {}",
                postRequest.getTitle(), userId);

        try {
            PostResponse savedPost = postService.createPost(postRequest, userId);
            logger.info("Post created successfully with ID: {}", savedPost.getId());
            return new ResponseEntity<>(savedPost, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error creating post: ", e);
            return ResponseEntity.internalServerError().body("Failed to create post: " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping
    public ResponseEntity<List<PostResponse>> getAllPosts() {
        logger.info("Received request to get all posts");

        try {
            List<PostResponse> posts = postService.getAllPosts();
            logger.info("Retrieved {} posts", posts.size());
            return ResponseEntity.ok(posts);
        } catch (Exception e) {
            logger.error("Error retrieving posts: ", e);
            return ResponseEntity.internalServerError().body(null);
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable Long id) {
        logger.info("Received request to get post with ID: {}", id);

        try {
            PostResponse post = postService.getPostById(id);
            logger.info("Post found with ID: {}", id);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            logger.warn("Post not found with ID: {}", id);
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            logger.error("Error retrieving post with ID {}: ", id, e);
            return ResponseEntity.internalServerError().body("Error retrieving post: " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/{id}/like")
    public ResponseEntity<?> likePost(@PathVariable Long id) {
        logger.info("Received request to like post with ID: {}", id);

        try {
            PostResponse post = postService.likePost(id);
            logger.info("Post liked successfully with ID: {}", id);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("not found")) {
                logger.warn("Post not found with ID: {}", id);
                return ResponseEntity.notFound().build();
            } else {
                logger.error("Error liking post with ID {}: ", id, e);
                return ResponseEntity.internalServerError().body("Error liking post: " + e.getMessage());
            }
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/{id}/unlike")
    public ResponseEntity<?> unlikePost(@PathVariable Long id) {
        logger.info("Received request to unlike post with ID: {}", id);

        try {
            PostResponse post = postService.unlikePost(id);
            logger.info("Post unliked successfully with ID: {}", id);
            return ResponseEntity.ok(post);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("not found")) {
                logger.warn("Post not found with ID: {}", id);
                return ResponseEntity.notFound().build();
            } else {
                logger.error("Error unliking post with ID {}: ", id, e);
                return ResponseEntity.internalServerError().body("Error unliking post: " + e.getMessage());
            }
        }
    }
}