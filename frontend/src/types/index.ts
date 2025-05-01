export interface User {
  id: number;
  username: string;
  email: string;
  avatar?: string;
  bio?: string;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  excerpt: string;
  coverImage?: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  likes: number;
  comments: number;
  category: string;
}

export interface Comment {
  id: number;
  content: string;
  author: User;
  createdAt: string;
  postId: number;
}
