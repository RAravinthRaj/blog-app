import axios from "axios";
import type { Post, Comment, User } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const register = (userData: {
  username: string;
  email: string;
  password: string;
}) => api.post<User>("/auth/register", userData);

export const getPosts = () => api.get<Post[]>("/posts");
export const getPost = (id: number) => api.get<Post>(`/posts/${id}`);
export const createPost = (post: Partial<Post>) =>
  api.post<Post>("/posts", post);
export const updatePost = (id: number, post: Partial<Post>) =>
  api.put<Post>(`/posts/${id}`, post);
export const deletePost = (id: number) => api.delete(`/posts/${id}`);

export const getComments = (postId: number) =>
  api.get<Comment[]>(`/posts/${postId}/comments`);
export const createComment = (postId: number, comment: Partial<Comment>) =>
  api.post<Comment>(`/posts/${postId}/comments`, comment);

export const login = (credentials: { username: string; password: string }) =>
  api.post<{ token: string; user: User }>("/auth/login", credentials);

export const getCurrentUser = () => api.get<User>("/users/me");
