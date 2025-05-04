import { SetStateAction, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  Share2,
  Bookmark,
  TrendingUp,
  List,
  Cpu,
  Palette,
  Briefcase,
  Coffee,
  Menu,
  X,
  Home,
  Plus,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "../../components";
import { toast } from "react-toastify";
import { IoSendSharp } from "react-icons/io5";
import React from "react";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const allPosts = [
  {
    id: 1,
    title: "How to Master React in 30 Days",
    category: "Technology",
    coverImage:
      "https://miro.medium.com/v2/resize:fit:1400/1*W7RrtI7JITRMdo8f7iTioQ.jpeg",
    excerpt:
      "Learn the fundamentals and advanced concepts of React.js with this comprehensive guide. From state management to hooks, we cover it all.",
    likes: 120,
    comments: 30,
  },
  {
    id: 2,
    title: "Understanding TypeScript for Beginners",
    category: "Technology",
    coverImage:
      "https://miro.medium.com/v2/resize:fit:1400/1*W7RrtI7JITRMdo8f7iTioQ.jpeg",
    excerpt:
      "TypeScript is a powerful tool that enhances JavaScript with strong typing. This guide walks you through the basics of TypeScript and its features.",
    likes: 85,
    comments: 12,
  },
  {
    id: 3,
    title: "Top 10 JavaScript Libraries You Should Know",
    category: "Technology",
    coverImage:
      "https://miro.medium.com/v2/resize:fit:1400/1*W7RrtI7JITRMdo8f7iTioQ.jpeg",
    excerpt:
      "Explore the best JavaScript libraries for 2025. From UI frameworks to utility libraries, these tools will help you become a better developer.",
    likes: 200,
    comments: 55,
  },
  {
    id: 4,
    title: "The Future of Web Development",
    category: "Technology",
    coverImage:
      "https://miro.medium.com/v2/resize:fit:1400/1*W7RrtI7JITRMdo8f7iTioQ.jpeg",
    excerpt:
      "Web development is constantly evolving. In this article, we explore the future trends and technologies that will shape the web in the coming years.",
    likes: 150,
    comments: 40,
  },
  {
    id: 5,
    title: "Mastering Node.js: From Beginner to Pro",
    category: "Technology",
    coverImage:
      "https://miro.medium.com/v2/resize:fit:1400/1*W7RrtI7JITRMdo8f7iTioQ.jpeg",
    excerpt:
      "Node.js is the go-to runtime for building fast and scalable server-side applications. This guide takes you from the basics to advanced topics in Node.js.",
    likes: 95,
    comments: 20,
  },
  {
    id: 6,
    title: "UI Design Principles Every Designer Should Know",
    category: "Design",
    coverImage:
      "https://miro.medium.com/v2/resize:fit:1400/1*W7RrtI7JITRMdo8f7iTioQ.jpeg",
    excerpt:
      "Learn the fundamental principles of UI design that will help you create beautiful and functional interfaces. We cover color theory, typography, layout, and more.",
    likes: 110,
    comments: 25,
  },
  {
    id: 7,
    title: "Color Theory for Digital Designers",
    category: "Design",
    coverImage:
      "https://miro.medium.com/v2/resize:fit:1400/1*W7RrtI7JITRMdo8f7iTioQ.jpeg",
    excerpt:
      "Understanding color theory is essential for creating stunning designs. This article explores color relationships, harmony, and psychology for digital products.",
    likes: 88,
    comments: 15,
  },
  {
    id: 8,
    title: "Starting a Successful Design Agency",
    category: "Business",
    coverImage:
      "https://miro.medium.com/v2/resize:fit:1400/1*W7RrtI7JITRMdo8f7iTioQ.jpeg",
    excerpt:
      "Thinking of starting your own design agency? This guide covers everything from business planning to client acquisition and team management.",
    likes: 135,
    comments: 32,
  },
  {
    id: 9,
    title: "The Entrepreneur's Guide to Digital Marketing",
    category: "Business",
    coverImage:
      "https://miro.medium.com/v2/resize:fit:1400/1*W7RrtI7JITRMdo8f7iTioQ.jpeg",
    excerpt:
      "Discover effective digital marketing strategies for entrepreneurs. From SEO to social media, learn how to grow your business online.",
    likes: 178,
    comments: 43,
  },
  {
    id: 10,
    title: "Mindfulness for Busy Professionals",
    category: "Lifestyle",
    coverImage: "",
    excerpt:
      "Incorporate mindfulness into your busy schedule with these practical techniques. Improve focus, reduce stress, and enhance overall well-being.",
    likes: 92,
    comments: 21,
  },
  {
    id: 11,
    title: "Creating the Perfect Home Office",
    category: "Lifestyle",
    coverImage: "",
    excerpt:
      "Design a productive and comfortable home office space. This guide covers ergonomics, lighting, organization, and creating the right ambiance.",
    likes: 105,
    comments: 18,
  },
];

const categories = [
  {
    name: "Technology",
    icon: <Cpu className="h-5 w-5 text-primary-600" />,
    count: allPosts.filter((post) => post.category === "Technology").length,
  },
  {
    name: "Design",
    icon: <Palette className="h-5 w-5 text-pink-500" />,
    count: allPosts.filter((post) => post.category === "Design").length,
  },
  {
    name: "Business",
    icon: <Briefcase className="h-5 w-5 text-blue-500" />,
    count: allPosts.filter((post) => post.category === "Business").length,
  },
  {
    name: "Lifestyle",
    icon: <Coffee className="h-5 w-5 text-yellow-500" />,
    count: allPosts.filter((post) => post.category === "Lifestyle").length,
  },
];

const mainNavItems = [
  {
    name: "Home",
    icon: <Home className="h-5 w-5 text-gray-600 " />,
    path: "/",
  },
  {
    name: "Popular",
    icon: <TrendingUp className="h-5 w-5 text-gray-600" />,
    path: "/popular",
  },
  {
    name: "Saved",
    icon: <Bookmark className="h-5 w-5 text-gray-600" />,
    path: "/saved",
  },
];

export const BlogApp = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [likedPosts, setLikedPosts] = useState({});
  const [postLikes, setPostLikes] = useState(
    allPosts.reduce((acc, post) => ({ ...acc, [post.id]: post.likes }), {})
  );
  const [savedPosts, setSavedPosts] = useState([]);
  const [newCommentText, setNewCommentText] = useState("");
  const [commentsData, setCommentsData] = useState<{ [key: string]: string[] }>(
    {}
  );
  const [openCommentPostId, setOpenCommentPostId] = useState<string | null>(
    null
  );

  const [currentView, setCurrentView] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  const FabButton = () => {
    return (
      <button className="lg:hidden fixed bottom-6 right-6 z-50 bg-gray-900 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-300">
        <Plus className="w-6 h-6" />
      </button>
    );
  };

  const _renderFilteredPosts = () => {
    let filteredResults = [...allPosts];

    if (searchQuery.trim() !== "") {
      filteredResults = filteredResults.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (currentView === "saved") {
      return filteredResults.filter((post) => savedPosts.includes(post.id));
    } else if (currentView === "popular") {
      return [...filteredResults].sort((a, b) => b.likes - a.likes).slice(0, 5);
    } else if (activeCategory !== "All") {
      return filteredResults.filter((post) => post.category === activeCategory);
    }

    return filteredResults;
  };

  const filteredPosts = _renderFilteredPosts();

  const _handleCategoryClick = (categoryName: SetStateAction<string>) => {
    setActiveCategory(categoryName);
    setCurrentView("home");
    setSidebarOpen(false);
  };

  const _handleNavItemClick = (view: SetStateAction<string>) => {
    setCurrentView(view);
    if (view !== "home") {
      setActiveCategory("All");
    }
    setSidebarOpen(false);
  };
  const _toggleLiked = (postId: string | number) => {
    const isLiked = !likedPosts[postId];

    setLikedPosts((prev) => ({
      ...prev,
      [postId]: isLiked,
    }));

    setPostLikes((likes) => ({
      ...likes,
      [postId]: (likes[postId] || 0) + (isLiked ? 1 : -1),
    }));
  };

  const _toggleSaved = (postId: any) => {
    setSavedPosts((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId]
    );
    if (!savedPosts.includes(postId)) {
      toast.success("Post Saved successfully!");
    } else {
      toast.success("Post UnSaved successfully!");
    }
  };

  const _toggleComments = (postId: string | null) => {
    setOpenCommentPostId((prev) => (prev === postId ? null : postId));
  };

  const _addComment = (postId: string, commentText: string) => {
    if (!commentText.trim()) return;

    setCommentsData((prev) => {
      const postComments = prev[postId] || [];
      return {
        ...prev,
        [postId]: [...postComments, commentText],
      };
    });

    setNewCommentText("");
  };

  const commentInputRef = useRef<HTMLInputElement>(null);

  const handleCommentSubmit = (id, e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission (page reload)
    const commentText = commentInputRef.current?.value.trim(); // Get the value from the input field
    if (commentText) {
      _addComment(id, commentText);
      if (commentInputRef.current) commentInputRef.current.value = ""; // Clear the input field
    }
  };

  const _navigation = () => {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-sm font-bold mb-4">Navigation</h3>
        <ul className="space-y-2">
          {mainNavItems.map((item) => (
            <li key={item.name}>
              <div
                onClick={() => _handleNavItemClick(item.name.toLowerCase())}
                className={`flex items-center gap-3 p-2 rounded-md w-full cursor-pointer text-left ${
                  currentView === item.name.toLowerCase()
                    ? "text-black font-bold -ml-2"
                    : "hover:bg-gray-100 text-gray-600"
                }`}
              >
                <span
                  className={
                    currentView === item.name.toLowerCase()
                      ? "p-2 bg-gray-200 rounded-4xl"
                      : "hover:bg-gray-100 text-gray-600"
                  }
                >
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const _renderCategory = () => {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-sm font-bold mb-4">Categories</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => _handleCategoryClick("All")}
              className={`flex justify-between items-center p-2 rounded-md w-full text-left ${
                activeCategory === "All" && currentView === "home"
                  ? "bg-primary-50 text-primary-700"
                  : "hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <List className="h-5 w-5 text-gray-600" />
                <span>All Posts</span>
              </div>
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                {allPosts.length}
              </span>
            </button>
          </li>
          {categories.map((category) => (
            <li key={category.name}>
              <button
                onClick={() => _handleCategoryClick(category.name)}
                className={`flex justify-between items-center p-2 rounded-md w-full text-left ${
                  activeCategory === category.name && currentView === "home"
                    ? "text-black font-bold"
                    : "hover:bg-gray-100"
                }`}
              >
                <div className="flex items-center gap-3">
                  {category.icon}
                  <span>{category.name}</span>
                </div>
                <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-full">
                  {category.count}
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const _MobileSidebar = () => (
    <>
      <div className="fixed top-18 left-2 z-50 lg:hidden">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 rounded-full bg-black/80 shadow-md backdrop-blur-sm"
        >
          <Menu className="h-5 w-5 text-white" />
        </button>
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setSidebarOpen(false)}
            />

            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-0 left-0 w-4/5 max-w-xs h-full bg-white z-50 shadow-lg overflow-y-auto"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center gap-2">
                  <List className="h-6 w-6 text-primary-600" />
                  <span className="font-bold text-gray-900">BlogApp</span>
                </div>
                <button onClick={() => setSidebarOpen(false)} className="p-2">
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
              {_navigation()}
              {_renderCategory()}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );

  const DesktopSidebar = () => (
    <div className="hidden lg:block w-64">
      <div className="sticky top-24 space-y-6">
        {_navigation()}
        {_renderCategory()}
      </div>
    </div>
  );

  const PostCard = ({ post }) => {
    return (
      <motion.article
        variants={itemVariants}
        className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all overflow-hidden border border-gray-100 hover:scale-[1.01]"
      >
        <Link to="/post">
          {post.coverImage && (
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-60 object-cover"
            />
          )}
        </Link>

        <div className="p-6">
          <div className="flex items-center space-x-2 mb-3">
            <span className="bg-primary-100 text-primary-700 text-xs font-semibold px-2.5 py-0.5 rounded">
              {post.category}
            </span>
            <span className="text-sm text-gray-500">5 min read</span>
          </div>

          <h2 className="text-2xl font-bold mb-2 text-gray-900 hover:text-primary-600 transition-colors">
            {post.title}
          </h2>

          <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                type="button"
                onClick={() => _toggleLiked(post.id)}
                className={`flex items-center space-x-1 transition-all ${
                  likedPosts[post.id]
                    ? "text-red-500"
                    : "text-gray-500 hover:text-red-500"
                }`}
              >
                <Heart
                  className={`h-5 w-5 ${
                    likedPosts[post.id] ? "fill-current" : ""
                  }`}
                />
                <span className="text-sm font-medium">
                  {postLikes[post.id]}
                </span>
              </button>

              <button
                type="button"
                onClick={() => _toggleComments(post.id)}
                className="flex items-center space-x-1 text-gray-500 hover:text-indigo-600 transition-all"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="text-sm font-medium">
                  {(commentsData?.[post.id]?.length || 0) +
                    (post?.comments || 0)}
                </span>
              </button>

              <button
                type="button"
                className="flex items-center space-x-1 text-gray-500 hover:text-green-500 transition-all"
              >
                <Share2 className="h-5 w-5" />
                <span className="hidden sm:inline text-sm font-medium">
                  Share
                </span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => _toggleSaved(post.id)}
              className={`flex items-center space-x-1 transition-all ${
                savedPosts.includes(post.id)
                  ? "text-yellow-500"
                  : "text-gray-500 hover:text-yellow-500"
              }`}
            >
              <Bookmark
                className={`h-5 w-5 ${
                  savedPosts.includes(post.id) ? "fill-current" : ""
                }`}
              />
              <span className="hidden sm:inline text-sm font-medium">
                {savedPosts.includes(post.id) ? "Saved" : "Save"}
              </span>
            </button>
          </div>

          <AnimatePresence>
            {openCommentPostId === post.id && (
              <motion.div
                key={`comment-${post.id}`}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 border-t pt-4 space-y-3 overflow-hidden"
              >
                <form onSubmit={(e) => handleCommentSubmit(post.id, e)}>
                  <div className="flex">
                    <input
                      ref={commentInputRef}
                      type="text"
                      placeholder="Write a comment..."
                      className="flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      type="submit"
                      className="flex items-center space-x-2 p-3 rounded-md cursor-pointer hover:bg-gray-100 hover:text-black transition-all duration-300"
                    >
                      <IoSendSharp />
                    </button>
                  </div>
                </form>

                <div className="space-y-2">
                  {(commentsData?.[post.id] || []).map(
                    (comment: string, idx: number) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-gray-100 p-3 rounded-md text-sm text-gray-700"
                      >
                        {comment}
                      </motion.div>
                    )
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.article>
    );
  };

  const TrendingSidebar = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="hidden lg:block lg:col-span-5 order-1 lg:order-2"
    >
      <div className="glass-effect rounded-xl p-6 sticky top-[100px] shadow-md bg-white/50 backdrop-blur-sm">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="h-5 w-5 text-primary-600" />
          <h2 className="text-lg font-semibold text-primary-800">
            Trending Posts
          </h2>
        </div>
        <div className="space-y-4">
          {allPosts
            .slice(0, 3)
            .sort((a, b) => b.likes - a.likes)
            .map((post) => (
              <a
                key={post.id}
                href={`#post-${post.id}`}
                className="flex space-x-4 group"
                onClick={() => {
                  setActiveCategory(post.category);
                  setCurrentView("home");
                }}
              >
                {post.coverImage && (
                  <img
                    src={post.coverImage}
                    alt={post.title}
                    className="w-24 h-24 rounded-lg object-cover group-hover:ring-2 ring-primary-500 transition-all"
                  />
                )}
                <div>
                  <h3 className="font-semibold group-hover:text-primary-600 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {post.excerpt.substring(0, 60)}...
                  </p>
                </div>
              </a>
            ))}
        </div>
      </div>
    </motion.div>
  );

  const MainContent = () => (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="lg:col-span-7 order-2 lg:order-1 space-y-6"
    >
      <header className="mb-6">
        <h1 className="text-2xl md:text-3xl text-center font-bold text-gray-900">
          {currentView === "saved"
            ? "Saved Posts"
            : currentView === "popular"
            ? "Popular Posts"
            : activeCategory === "All"
            ? "All Posts"
            : `${activeCategory} Posts`}
        </h1>
        <p className="text-gray-600 mt-2 text-center ">
          {currentView === "saved"
            ? "Your bookmarked articles for later reading"
            : currentView === "popular"
            ? "Most liked articles across all categories"
            : activeCategory === "All"
            ? "Browse through our latest articles"
            : `Explore our best ${activeCategory.toLowerCase()} content`}
        </p>
      </header>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No posts found
          </h3>
          <p className="text-gray-500">
            {currentView === "saved"
              ? "You haven't saved any posts yet. Browse and bookmark posts to see them here."
              : "No posts available for this category at the moment. Check back later!"}
          </p>
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="container mx-auto bg-gray-50 pt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <_MobileSidebar />
          <DesktopSidebar />

          <div className="flex-1 from-blue-800 via-indigo-700 to-purple-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <MainContent />
              <TrendingSidebar />
            </div>
          </div>
        </div>
      </div>

      <Link to="/createPost">
        <FabButton />
      </Link>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
};

export default BlogApp;
