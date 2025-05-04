package com.blog.blog_app.service;

import com.blog.blog_app.dto.PostRequest;
import com.blog.blog_app.dto.PostResponse;
import com.blog.blog_app.model.PostModel;
import com.blog.blog_app.model.SignUpModel;
import com.blog.blog_app.repository.CommentRepository;
import com.blog.blog_app.repository.PostRepository;
import com.blog.blog_app.repository.SignUpRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PostService {

    private static final Logger logger = LoggerFactory.getLogger(PostService.class);

    @Autowired
    private PostRepository postRepository;

    @Autowired
    private SignUpRepository userRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Transactional
    public PostResponse createPost(PostRequest postRequest, int userId) {
        logger.info("Creating new post for user with ID: {}", userId);

        Optional<SignUpModel> userOptional = userRepository.findById((long) userId);
        if (!userOptional.isPresent()) {
            logger.error("User with ID {} not found", userId);
            throw new RuntimeException("User not found");
        }

        PostModel post = new PostModel();
        post.setTitle(postRequest.getTitle());
        post.setExcerpt(postRequest.getExcerpt());
        post.setCategory(postRequest.getCategory());
        post.setCoverImage(postRequest.getCoverImage());
        post.setContent(postRequest.getContent());
        post.setLikes(0);
        post.setUser(userOptional.get());

        PostModel savedPost = postRepository.save(post);
        logger.info("Post saved successfully with ID: {}", savedPost.getId());

        return convertToDto(savedPost);
    }

    @Transactional(readOnly = true)
    public PostResponse getPostById(Long postId) {
        logger.info("Fetching post with ID: {}", postId);

        PostModel post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        return convertToDto(post);
    }

    @Transactional(readOnly = true)
    public List<PostResponse> getAllPosts() {
        logger.info("Fetching all posts");

        List<PostModel> posts = postRepository.findAll();
        return posts.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public PostResponse likePost(Long postId) {
        logger.info("Incrementing likes for post with ID: {}", postId);

        PostModel post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        postRepository.incrementLikes(postId);
        post.setLikes(post.getLikes() + 1);

        logger.info("Likes incremented for post with ID: {}", postId);

        return convertToDto(post);
    }

    @Transactional
    public PostResponse unlikePost(Long postId) {
        logger.info("Decrementing likes for post with ID: {}", postId);

        PostModel post = postRepository.findById(postId)
                .orElseThrow(() -> new RuntimeException("Post not found with id: " + postId));

        if (post.getLikes() > 0) {
            postRepository.decrementLikes(postId);
            post.setLikes(post.getLikes() - 1);
            logger.info("Likes decremented for post with ID: {}", postId);
        } else {
            logger.warn("Cannot decrement likes below 0 for post with ID: {}", postId);
        }

        return convertToDto(post);
    }

    private PostResponse convertToDto(PostModel post) {
        PostResponse dto = new PostResponse();
        dto.setId(post.getId());
        dto.setTitle(post.getTitle());
        dto.setExcerpt(post.getExcerpt());
        dto.setCategory(post.getCategory());
        dto.setCoverImage(post.getCoverImage());
        dto.setContent(post.getContent());
        dto.setLikes(post.getLikes());
        dto.setUserId(post.getUser().getId());
        dto.setUsername(post.getUser().getUsername());
        dto.setCreatedAt(post.getCreatedAt());
        dto.setUpdatedAt(post.getUpdatedAt());

        // Get comment count
        dto.setCommentCount((int) commentRepository.countByPostId(post.getId()));

        return dto;
    }

}