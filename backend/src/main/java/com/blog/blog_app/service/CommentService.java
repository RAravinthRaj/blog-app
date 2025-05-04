package com.blog.blog_app.service;

import com.blog.blog_app.dto.CommentRequest;
import com.blog.blog_app.dto.CommentResponse;
import com.blog.blog_app.model.Comment;
import com.blog.blog_app.model.PostModel;
import com.blog.blog_app.model.SignUpModel;
import com.blog.blog_app.repository.CommentRepository;
import com.blog.blog_app.repository.PostRepository;
import com.blog.blog_app.repository.SignUpRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentService {

    private static final Logger logger = LoggerFactory.getLogger(CommentService.class);

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private SignUpRepository userRepository;

    @Transactional
    public CommentResponse createComment(CommentRequest commentRequest, Long userId) {
        logger.info("Creating comment for post ID: {} by user ID: {}", commentRequest.getPostId(), userId);

        PostModel post = postRepository.findById(commentRequest.getPostId())
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + commentRequest.getPostId()));

        SignUpModel user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + userId));

        Comment comment = new Comment();
        comment.setMessage(commentRequest.getMessage());
        comment.setPost(post);
        comment.setUser(user);

        Comment savedComment = commentRepository.save(comment);
        logger.info("Comment saved successfully with ID: {}", savedComment.getId());

        return convertToDto(savedComment);
    }

    @Transactional(readOnly = true)
    public List<CommentResponse> getCommentsByPostId(Long postId) {
        logger.info("Fetching comments for post with ID: {}", postId);

        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Page<CommentResponse> getPaginatedCommentsByPostId(Long postId, Pageable pageable) {
        logger.info("Fetching paginated comments for post with ID: {}", postId);

        Page<Comment> commentPage = commentRepository.findByPostId(postId, pageable);
        return commentPage.map(this::convertToDto);
    }

    @Transactional
    public CommentResponse updateComment(Long commentId, CommentRequest commentRequest, Long userId) {
        logger.info("Updating comment with ID: {}", commentId);

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));

        if (!comment.getUser().getId().equals(userId)) {
            logger.error("User with ID {} not authorized to update comment with ID {}", userId, commentId);
            throw new RuntimeException("Not authorized to update this comment");
        }

        comment.setMessage(commentRequest.getMessage());
        Comment updatedComment = commentRepository.save(comment);
        logger.info("Comment updated successfully with ID: {}", updatedComment.getId());

        return convertToDto(updatedComment);
    }

    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        logger.info("Deleting comment with ID: {}", commentId);

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found with id: " + commentId));

        if (!comment.getUser().getId().equals(userId)) {
            logger.error("User with ID {} not authorized to delete comment with ID {}", userId, commentId);
            throw new RuntimeException("Not authorized to delete this comment");
        }

        commentRepository.delete(comment);
        logger.info("Comment deleted successfully with ID");
    }

    private CommentResponse convertToDto(Comment comment) {
        CommentResponse response = new CommentResponse();
        response.setId(comment.getId());
        response.setMessage(comment.getMessage());
        response.setPostId(comment.getPost().getId());
        response.setUserId(comment.getUser().getId());
        response.setUsername(comment.getUser().getUsername());
        response.setCreatedAt(comment.getCreatedAt());
        return response;
    }
}