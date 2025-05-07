import axios from "axios";

const API_URL = "http://localhost:8080/api";

interface RegisterData {
  username: string;
  email: string;
  password: string;
}

interface SignInData {
  email: string;
  password: string;
}

interface PostRequest {
  title: string;
  excerpt: string;
  category: string;
  coverImage: string;
  content: string;
}

export const register = (data: RegisterData) => {
  const { confirmPassword, ...registerData } = data as any;

  return axios.post(`${API_URL}/auth/signup`, registerData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const login = (data: SignInData) => {
  return axios.post(`${API_URL}/auth/signin`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const createPost = (postData: PostRequest, userId: number) => {
  return axios.post(`${API_URL}/posts?userId=${userId}`, postData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getPostsByCategory = async (category: string) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${category}`, {
      headers: {
        "Content-Type": "application/json",
      },
      validateStatus: (status) => {
        return status === 200 || status === 204;
      },
    });
    return response.status === 204 ? [] : response.data;
  } catch (error) {
    console.error(`Error fetching posts for category '${category}':`, error);
    throw error;
  }
};

export const getLikesByPostId = async (postId: number): Promise<number[]> => {
  const response = await axios.get<number[]>(
    `${API_URL}/posts/${postId}/likes`
  );
  return response.data;
};

export const getUsernamesByIds = async (userIds: number[]) => {
  try {
    // Join the userIds array into a comma-separated string
    const response = await axios.get(
      "http://localhost:8080/api/auth/getUserNames",
      {
        params: {
          userIds: userIds.join(","), // Convert the array into a comma-separated string
        },
      }
    );
    return response.data.usernames; // Return the list of usernames
  } catch (error) {
    console.error("Error fetching usernames:", error);
    return []; // Return an empty array if an error occurs
  }
};

export const getCommentsByPostId = async (
  postId: number
): Promise<{ userName: string; text: string }[]> => {
  try {
    const response = await axios.get(`${API_URL}/posts/${postId}/comments`);
    return response.data;
  } catch (err) {
    console.error("Error fetching comments:", err);
    throw new Error("Failed to fetch comments");
  }
};

// Function to add a comment to a specific post
export const addComment = async (
  postId: number,
  userId: number,
  text: string
): Promise<void> => {
  try {
    await axios.post(`${API_URL}/posts/${postId}/comments`, {
      userId,
      text,
    });
  } catch (err) {
    console.error("Error adding comment:", err);
    throw new Error("Failed to add comment");
  }
};
