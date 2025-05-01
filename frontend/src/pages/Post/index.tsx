import { useState, useEffect } from "react";
import { format } from "date-fns";
import { MessageSquare, Share2, Bookmark, Heart, Send } from "lucide-react";
import { Navbar } from "../../components";

function Post() {
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [likesCount, setLikesCount] = useState(150);
  const [localComments, setLocalComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Sample data (would normally come from API)
  const post = {
    id: 1,
    title: "The Future of Web Development: Trends to Watch",
    category: "Web Development",
    coverImage: "https://via.placeholder.com/800x400",
    createdAt: "2025-04-24T08:00:00Z",
    content:
      "<p>The web development industry is evolving faster than ever before. From modern frameworks to AI-driven tools, we explore what the future holds for developers worldwide.</p><h2>1. AI-Assisted Development</h2><p>Artificial intelligence is revolutionizing how we write and debug code. Developers are increasingly relying on AI pair programmers to boost productivity and solve complex problems more efficiently.</p><h2>2. WebAssembly Expansion</h2><p>WebAssembly continues to grow in popularity, enabling high-performance applications to run directly in the browser. This technology bridges the gap between web and native applications.</p><h2>3. Edge Computing</h2><p>With the rise of edge computing, web applications are becoming faster and more reliable by moving computation closer to the user.</p>",
    likes: 150,
    author: {
      username: "john_doe",
      avatar: "https://via.placeholder.com/40",
      bio: "A passionate web developer with a love for new technologies.",
    },
  };

  const initialComments = [
    {
      id: 1,
      author: {
        username: "jane_smith",
        avatar: "https://via.placeholder.com/40",
      },
      content:
        "This is a great read! I agree with most of the trends you mentioned, especially the rise of AI in development.",
      createdAt: "2025-04-24T09:00:00Z",
      likes: 12,
    },
    {
      id: 2,
      author: {
        username: "alex_brown",
        avatar: "https://via.placeholder.com/40",
      },
      content:
        "Looking forward to seeing how these trends unfold in the next few years. Exciting times for developers!",
      createdAt: "2025-04-24T09:30:00Z",
      likes: 8,
    },
  ];

  useEffect(() => {
    setLocalComments(initialComments);
  }, []);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      const newCommentObj = {
        id: localComments.length + 1,
        author: {
          username: "current_user",
          avatar: "https://via.placeholder.com/40",
        },
        content: newComment,
        createdAt: new Date().toISOString(),
        likes: 0,
      };

      setLocalComments([...localComments, newCommentObj]);
      setNewComment("");
      setIsLoading(false);
    }, 600);
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
  };

  const toggleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div>
      <div className="mb-16">
        <Navbar />
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-0 py-8">
        <article className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 hover:shadow-2xl mb-10">
          {post.coverImage && (
            <div className="relative h-64 sm:h-96 overflow-hidden">
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6 text-white">
                <span className="bg-indigo-600 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
            </div>
          )}
          <div className="p-6 sm:p-10">
            <div className="flex items-center space-x-2 text-sm text-gray-500 mb-4">
              <span>{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
              <span>•</span>
              <span>5 min read</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-900 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center space-x-4 mb-8 border-b border-gray-100 pb-6">
              <img
                src={post.author.avatar || "https://via.placeholder.com/40"}
                alt={post.author.username}
                className="w-12 h-12 rounded-full border-2 border-indigo-500"
              />
              <div>
                <p className="font-medium text-gray-900">
                  {post.author.username}
                </p>
                <p className="text-sm text-gray-600">{post.author.bio}</p>
              </div>
            </div>
            <div
              className="prose max-w-none mb-8 text-gray-700"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
            <div className="flex items-center justify-between pt-6 border-t border-gray-100">
              <div className="flex items-center space-x-6">
                <button
                  onClick={toggleLike}
                  className={`flex items-center space-x-2 transition-all ${
                    isLiked
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-500"
                  }`}
                >
                  <Heart
                    className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                  />
                  <span className="font-medium">{likesCount}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-all">
                  <MessageSquare className="h-5 w-5" />
                  <span className="font-medium">{localComments.length}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-all">
                  <Share2 className="h-5 w-5" />
                  <span className="hidden sm:inline font-medium">Share</span>
                </button>
              </div>
              <button
                onClick={toggleSave}
                className={`flex items-center space-x-2 transition-all ${
                  isSaved
                    ? "text-yellow-500"
                    : "text-gray-500 hover:text-yellow-500"
                }`}
              >
                <Bookmark
                  className={`h-5 w-5 ${isSaved ? "fill-current" : ""}`}
                />
                <span className="hidden sm:inline font-medium">
                  {isSaved ? "Saved" : "Save"}
                </span>
              </button>
            </div>
          </div>
        </article>

        {/* Comments Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-gray-900">
            Comments ({localComments.length})
          </h2>
          <form onSubmit={handleSubmitComment} className="mb-8">
            <div className="relative">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Share your thoughts..."
                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all resize-none"
                rows={3}
              />
              <button
                type="submit"
                disabled={isLoading || !newComment.trim()}
                className={`absolute bottom-3 right-3 p-2 rounded-full ${
                  isLoading || !newComment.trim()
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 transition-colors"
                } text-white`}
              >
                <Send className="h-5 w-5" />
              </button>
            </div>
          </form>

          <div className="space-y-6">
            {localComments.map((comment) => (
              <div
                key={comment.id}
                className="flex space-x-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <img
                  src={
                    comment.author.avatar || "https://via.placeholder.com/40"
                  }
                  alt={comment.author.username}
                  className="w-10 h-10 rounded-full"
                />
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="font-medium text-gray-900">
                      {comment.author.username}
                    </span>
                    <span className="text-xs text-gray-500">
                      {format(
                        new Date(comment.createdAt),
                        "MMM d, yyyy • h:mm a"
                      )}
                    </span>
                  </div>
                  <p className="mt-2 text-gray-700">{comment.content}</p>
                  <div className="flex items-center mt-2 space-x-4">
                    <button className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">
                      Like ({comment.likes})
                    </button>
                    <button className="text-xs text-gray-500 hover:text-indigo-600 transition-colors">
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {localComments.length > 3 && (
            <div className="text-center mt-8">
              <button className="px-6 py-2 border border-indigo-500 text-indigo-600 rounded-lg hover:bg-indigo-50 transition-colors">
                Load More Comments
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
