import { useEffect, useState, useMemo, useCallback } from "react";
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
  MessageCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Footer } from "../../components";
import { getLikesByPostId, getPostsByCategory } from "../../api";
import { IPost } from "../../types/index";
import LikeButton from "./likes";
import user from "../../assets/profile.png";
import { format } from "date-fns";
import { HeartAnimation } from "./heartAnimation";
import { toggleLike } from "../../api/likesApi";

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

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
  const [savedPosts, setSavedPosts] = useState([]);
  const [category, setCategory] = useState("All");
  const [posts, setPosts] = useState([]);
  const [currentView, setCurrentView] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>(
    {}
  );

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const data = await getPostsByCategory(category);
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  useEffect(() => {
    const fetchCategoryCounts = async () => {
      try {
        const categories = [
          "All",
          "Technology",
          "Design",
          "Business",
          "Lifestyle",
          "Health",
        ];

        const countPromises = categories.map(async (cat) => {
          const posts = await getPostsByCategory(cat === "All" ? "all" : cat);
          return { [cat]: posts.length };
        });

        const results = await Promise.all(countPromises);
        const countsObject = Object.assign({}, ...results);
        setCategoryCounts(countsObject);
      } catch (error) {
        console.error("Error fetching category counts:", error);
      }
    };

    fetchCategoryCounts();
  }, []);

  const categories = useMemo(
    () => [
      {
        name: "All",
        icon: <List className="h-5 w-5 text-gray-600" />,
        count: categoryCounts["All"] ?? 0,
      },
      {
        name: "Technology",
        icon: <Cpu className="h-5 w-5 text-primary-600" />,
        count: categoryCounts["Technology"] ?? 0,
      },
      {
        name: "Design",
        icon: <Palette className="h-5 w-5 text-pink-500" />,
        count: categoryCounts["Design"] ?? 0,
      },
      {
        name: "Business",
        icon: <Briefcase className="h-5 w-5 text-blue-500" />,
        count: categoryCounts["Business"] ?? 0,
      },
      {
        name: "Lifestyle",
        icon: <Coffee className="h-5 w-5 text-yellow-500" />,
        count: categoryCounts["LifeStyle"] ?? 0,
      },
      {
        name: "Health",
        icon: <Heart className="h-5 w-5 text-red-500" />,
        count: categoryCounts["Health"] ?? 0,
      },
    ],
    [posts]
  );

  const filteredPosts = useMemo(() => {
    let filteredResults = [...posts];

    if (currentView === "saved") {
      return filteredResults.filter((post) => savedPosts.includes(post.id));
    } else if (currentView === "popular") {
      return [...filteredResults]
        .sort((a, b) => b.likes.length - a.likes.length)
        .slice(0, 3);
    } else if (activeCategory !== "All") {
      return filteredResults.filter((post) => post.category === activeCategory);
    }

    return filteredResults;
  }, [posts, currentView, activeCategory, savedPosts]);

  const handleCategoryClick = useCallback((selectedCategory: string) => {
    setActiveCategory(selectedCategory);
    setCategory(selectedCategory);
    setCurrentView("home");
    setSidebarOpen(false);
  }, []);

  const handleNavItemClick = useCallback((view: any) => {
    setCurrentView(view);
    if (view !== "home") {
      setActiveCategory("All");
    }
    setSidebarOpen(false);
  }, []);

  const navigateToPostPage = (post: IPost) => {
    navigate("/post", { state: { post } });
  };

  const Navigation = useMemo(() => {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-sm font-bold mb-4">Navigation</h3>
        <ul className="space-y-2">
          {mainNavItems.map((item) => (
            <li key={item.name}>
              <div
                onClick={() => handleNavItemClick(item.name.toLowerCase())}
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
  }, [currentView, handleNavItemClick]);

  const CategorySection = useMemo(() => {
    return (
      <div className="bg-white rounded-xl shadow p-4">
        <h3 className="text-sm font-bold mb-4">Categories</h3>
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => handleCategoryClick("All")}
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
                {categoryCounts["All"]}
              </span>
            </button>
          </li>
          {categories.slice(1).map((category) => (
            <li key={category.name}>
              <button
                onClick={() => handleCategoryClick(category.name)}
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
  }, [
    activeCategory,
    currentView,
    categories,
    handleCategoryClick,
    posts.length,
  ]);

  const MobileSidebar = useCallback(
    () => (
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
                {Navigation}
                {CategorySection}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </>
    ),
    [isSidebarOpen, Navigation, CategorySection]
  );

  const DesktopSidebar = useCallback(
    () => (
      <div className="hidden lg:block w-64">
        <div className="sticky top-24 space-y-6">
          {Navigation}
          {CategorySection}
        </div>
      </div>
    ),
    [Navigation, CategorySection]
  );

  const PostCard = ({ post }: any) => {
    const [likerIds, setLikerIds] = useState<number[]>([]);
    const [showHeart, setShowHeart] = useState(false);
    const [firstShowHeart, setFirstShowHeart] = useState(false);

    const userId = parseInt(localStorage.getItem("id") || "0", 10);
    const userName = localStorage.getItem("username") || "";

    useEffect(() => {
      const fetchLikes = async () => {
        const likers = await getLikesByPostId(post.id);
        setLikerIds(likers);
      };
      fetchLikes();
    }, [post.id]);

    const handleToggleLike = async () => {
      const hasLiked = likerIds.includes(userId);

      try {
        if (hasLiked) {
          setLikerIds((prev) => prev.filter((id) => id !== userId));
        } else {
          setLikerIds((prev) => [...prev, userId]);
        }

        await toggleLike(post.id, userId);
      } catch (error) {
        console.error("Error toggling like:", error);
      }
    };

    const handleDoubleClick = async () => {
      if (!userId) return;

      if (!firstShowHeart) {
        const hasLiked = likerIds.includes(userId);

        // Only like if not already liked
        if (!hasLiked) {
          setLikerIds((prev) => [...prev, userId]);
          try {
            await toggleLike(post.id, userId);
          } catch (error) {
            console.error("Error toggling like:", error);
            setLikerIds((prev) => prev.filter((id) => id !== userId)); // rollback
          }
        }

        setFirstShowHeart(true); // only once
      }

      setShowHeart(true);

      setTimeout(() => {
        setShowHeart(false);
      }, 1000);
    };

    return (
      <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        {/* Content Section */}
        <div className="p-4" onDoubleClick={handleDoubleClick}>
          <div className="relative w-full mb-4 h-64 overflow-hidden cursor-pointer">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full mb-2 object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
            {showHeart && <HeartAnimation showHeart={showHeart} />}
          </div>

          {/* Author info */}
          <div className="flex items-center gap-3 mb-5">
            <img
              src={user}
              alt={post.username}
              className="w-12 h-12 rounded-full object-cover border-2 border-primary-500 shadow-sm"
              loading="lazy"
            />
            <div>
              <span className="text-lg font-semibold text-gray-800">
                {post.username}
              </span>
              <p className="text-xs text-gray-500">
                on {format(new Date(post.createdAt), "MMM d, yyyy")}
              </p>
            </div>
          </div>

          {/* Post title */}
          <h2
            onClick={() => {
              navigateToPostPage(post);
            }}
            className="text-2xl font-bold text-gray-900 hover:text-primary-600 transition-colors cursor-pointer mb-3"
          >
            {post.title}
          </h2>

          {/* Post excerpt */}
          <p className="text-gray-700 text-base leading-relaxed line-clamp-3 mb-5">
            {post.excerpt}
          </p>

          {/* Categories and reading time */}
          <div className="flex items-center justify-between mb-5">
            <span className="bg-gradient-to-r from-primary-600 to-primary-400 text-white px-4 py-1 rounded-full text-xs font-medium">
              {post.category}
            </span>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                5 min read
              </span>
            </div>
          </div>

          {/* Interaction buttons */}
          <div className="flex items-center justify-between border-t pt-4 border-gray-100">
            <LikeButton
              postId={post.id}
              userId={userId}
              userName={userName}
              likerIds={likerIds}
              onToggleLike={handleToggleLike}
            />
            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
              <MessageCircle size={18} />
              <span className="text-sm text-gray-600">
                {post.comments || 0}
              </span>
            </button>

            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
              <Share2 size={18} />
            </button>

            <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 transition-colors">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TrendingSidebar = useCallback(
    () => (
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
            {posts
              .sort((a, b) => b.likes.length - a.likes.length)
              .slice(0, 3)
              .map((post) => (
                <a
                  key={post.id}
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
                      className="w-35 h-25 rounded-lg object-fit group-hover:ring-2 ring-primary-500 transition-all"
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
    ),
    [posts, setActiveCategory, setCurrentView]
  );

  const MainContent = useCallback(() => {
    if (isLoading) {
      return (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            Loading posts...
          </h3>
        </div>
      );
    }

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="lg:col-span-7 order-2 lg:order-1 space-y-6"
      >
        <header className="mt-4 mb-6">
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
  }, [isLoading, currentView, activeCategory, filteredPosts, PostCard]);

  const FabButton = useCallback(() => {
    return (
      <button className="lg:hidden fixed bottom-6 right-6 z-50 bg-gray-900 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition duration-300">
        <Plus className="w-6 h-6" />
      </button>
    );
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto  pt-20 px-4">
        <div className="flex flex-col lg:flex-row gap-8">
          <MobileSidebar />
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

      <Footer />
    </div>
  );
};

export default BlogApp;
