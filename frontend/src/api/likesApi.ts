// src/services/likesApi.ts

// Base API URL - should be configured from environment variables
const API_BASE_URL = "http://localhost:8080/api";

// Types definitions
export interface LikeInfo {
  likeCount: number;
  userHasLiked: boolean;
}

export interface LikeCountResponse {
  count: number;
}

/**
 * Handles API errors and provides consistent error handling
 */
const handleApiError = async (response: Response) => {
  if (!response.ok) {
    try {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.status}`);
    } catch (e) {
      throw new Error(`API Error: ${response.statusText}`);
    }
  }
  return response;
};

/**
 * Get the total number of likes for a post and whether the current user has liked it
 */
export const getLikeInfo = async (
  postId: number,
  userId: number
): Promise<LikeInfo> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/likes?userId=${userId}`,
      {
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      }
    );

    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Error fetching like info:", error);
    throw error;
  }
};

/**
 * Get only the like count for a post (for unauthenticated users)
 */
export const getLikeCount = async (postId: number): Promise<number> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/likes/count`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    await handleApiError(response);
    const data: LikeCountResponse = await response.json();
    return data.count;
  } catch (error) {
    console.error("Error fetching like count:", error);
    throw error;
  }
};

/**
 * Toggle the like status for a post
 */
export const toggleLike = async (
  postId: number,
  userId: number
): Promise<LikeInfo> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/posts/${postId}/toggle-like`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ userId }),
        credentials: "include",
      }
    );

    await handleApiError(response);
    return await response.json();
  } catch (error) {
    console.error("Error toggling like:", error);
    throw error;
  }
};
