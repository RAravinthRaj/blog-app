import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { getLikesByPostId, getUsernamesByIds } from "../../api/index";
import { toggleLike } from "../../api/likesApi";

interface LikesProps {
  postId: number;
}

const LikeButton: React.FC<LikesProps> = ({ postId }) => {
  const [likerIds, setLikerIds] = useState<number[]>([]);
  const [likersNames, setLikerNames] = useState<string[]>([]);
  const [userId, setUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasLiked, setHasLiked] = useState(false);

  useEffect(() => {
    const storedUserId = localStorage.getItem("id");
    if (storedUserId) {
      setUserId(parseInt(storedUserId, 10));
    }
  }, []);

  useEffect(() => {
    const storedUserName = localStorage.getItem("username");
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const fetchLikerIds = async () => {
    try {
      setIsLoading(true);
      const likers = await getLikesByPostId(postId);
      setLikerIds(likers);
      setHasLiked(userId ? likers.includes(userId) : false);
    } catch (err) {
      console.error("Failed to fetch likes", err);
      setError("Could not load likes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLikerIds();
  }, [postId, userId]);

  const _fetchLikerNames = async () => {
    try {
      setIsLoading(true);
      const likersName = await getUsernamesByIds(likerIds);
      setLikerNames(likersName);
    } catch (err) {
      console.error("Failed to fetch likes", err);
      setError("Could not load likes.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (likerIds.length > 0) {
      _fetchLikerNames();
    }
  }, [likerIds]);

  const handleToggleLike = async () => {
    if (!userId) {
      setError("Please log in to like this post.");
      return;
    }

    try {
      setIsLoading(true);
      if (hasLiked) {
        setLikerIds((prev) => prev.filter((id) => id !== userId));
      } else {
        setLikerIds((prev) => [...prev, userId]);
      }
      setHasLiked((prev) => !prev);

      await toggleLike(postId, userId);

      fetchLikerIds();
      _fetchLikerNames();
    } catch (err) {
      console.error("Failed to toggle like", err);
      setError("Could not update like status.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-1">
      <div className="flex items-center space-x-1">
        <button
          onClick={handleToggleLike}
          disabled={isLoading}
          className={`flex items-center space-x-1 focus:outline-none transition-transform duration-200 hover:scale-110 ${
            isLoading ? "opacity-50" : ""
          }`}
          aria-label={hasLiked ? "Unlike" : "Like"}
        >
          <Heart
            className={`${
              likerIds.includes(Number(userId))
                ? "fill-red-500 text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
            size={16}
          />
          <span
            className={`text-sm font-medium${
              likerIds.includes(Number(userId))
                ? " text-red-500"
                : "text-gray-600 hover:text-red-500"
            }`}
          >
            {likerIds.length}
          </span>
        </button>

        {error && <span className="text-red-500 text-xs ml-2">{error}</span>}
      </div>

      {likersNames.length > 0 && (
        <div className="text-xs text-gray-500">
          Liked by :&nbsp;
          {likerIds.includes(userId) ? (
            <>
              <span>You</span>
              {likersNames.filter((name) => name !== userName).length > 0 &&
                `, ${likersNames
                  .filter((name) => name !== userName)
                  .join(", ")}`}
            </>
          ) : (
            likersNames.join(", ")
          )}
        </div>
      )}
    </div>
  );
};

export default LikeButton;
