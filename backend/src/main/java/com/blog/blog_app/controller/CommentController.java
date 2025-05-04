package com.blog.blog_app.controller;

import com.blog.blog_app.dto.CommentRequest;
import com.blog.blog_app.dto.CommentResponse;
import com.blog.blog_app.service.CommentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
public class CommentController {

    private static final Logger logger = LoggerFactory.getLogger(CommentController.class);

    @Autowired
    private CommentService commentService;

    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping
    public ResponseEntity<?> createComment(
            @RequestParam("userId") long userId,
            @RequestBody CommentRequest commentRequest) {

        logger.info("Received request to create a comment for post ID: {} by user ID: {}",
                commentRequest.getPostId(), userId);

        try {
            CommentResponse createdComment = commentService.createComment(commentRequest, userId);
            logger.info("Comment created successfully");
            return new ResponseEntity<>(createdComment, HttpStatus.CREATED);
        } catch (Exception e) {
            logger.error("Error creating comment: ", e);
            return ResponseEntity.internalServerError().body("Failed to create comment: " + e.getMessage());
        }
    }

    @CrossOrigin(origins = "http://localhost:5173")
    @GetMapping("/post/{postId}")
    public ResponseEntity<?> getCommentsByPostId(@PathVariable Long postId) {
        logger.info("Fetching all comments for post ID: {}", postId);

        try {
            List<CommentResponse> comments = commentService.getCommentsByPostId(postId);
            logger.info("Retrieved {} comments for post ID: {}", comments.size(), postId);
            return ResponseEntity.ok(comments);
        } catch (Exception e) {
            logger.error("Error retrieving comments for post ID {}: ", postId, e);
            return ResponseEntity.internalServerError().body("Error retrieving comments: " + e.getMessage());
        }
    }
}