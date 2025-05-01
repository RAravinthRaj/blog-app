import React, { useState } from "react";
import { getCurrentUser } from "../../api";
import type { User } from "../../types";

function Profile() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    profileVisibility: "public",
  });

  const user = {
    username: "john_doe",
    email: "john.doe@example.com",
    avatar: "https://via.placeholder.com/128",
    bio: "A passionate developer exploring the world of React, JavaScript, and full-stack development.",
  };

  // Sample post data
  const posts = [
    {
      id: 1,
      title: "The Future of Web Development: Trends to Watch",
      category: "Web Development",
      coverImage: "https://via.placeholder.com/800x400",
      createdAt: "2025-04-24T08:00:00Z",
      content:
        "<p>The web development industry is evolving faster than ever before. From modern frameworks to AI-driven tools, we explore what the future holds...</p>",
      likes: 150,
      author: {
        username: "john_doe",
        avatar: "https://via.placeholder.com/40",
        bio: "A passionate web developer with a love for new technologies.",
      },
      comments: [
        {
          id: 1,
          author: {
            username: "jane_smith",
            avatar: "https://via.placeholder.com/40",
          },
          content:
            "This is a great read! I agree with most of the trends you mentioned, especially the rise of AI in development.",
          createdAt: "2025-04-24T09:00:00Z",
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
        },
      ],
    },
    {
      id: 2,
      title: "Building Accessible Web Applications",
      category: "Accessibility",
      coverImage: "https://via.placeholder.com/800x400",
      createdAt: "2025-04-20T10:15:00Z",
      content:
        "<p>Accessibility should be a priority for all web developers. Here's how to make your applications more inclusive...</p>",
      likes: 87,
      author: {
        username: "john_doe",
        avatar: "https://via.placeholder.com/40",
        bio: "A passionate web developer with a love for new technologies.",
      },
      comments: [],
    },
  ];

  const handleEmailNotificationsChange = () => {
    setSettings({
      ...settings,
      emailNotifications: !settings.emailNotifications,
    });
    console.log("Email notifications set to:", !settings.emailNotifications);
  };

  const handleProfileVisibilityChange = (event: { target: { value: any } }) => {
    setSettings({
      ...settings,
      profileVisibility: event.target.value,
    });
    console.log("Profile visibility set to:", event.target.value);
  };

  // Format date to a more readable format
  const formatDate = (dateString: string | number | Date) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-xl max-w-md w-full">
          <div className="text-center">
            <div className="mb-6 inline-flex rounded-full bg-indigo-100 p-4">
              <svg
                className="h-10 w-10 text-indigo-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                ></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600">
              Please log in to view your profile information
            </p>
            <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-lg transition duration-300">
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-10 px-4">
      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-10">
        {/* Hero Banner with Geometric Pattern */}
        <div className="relative h-48 bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
          <div className="absolute inset-0 opacity-20">
            <div
              className="h-full w-full"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 25px 25px, rgba(255,255,255,0.2) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255,255,255,0.2) 2%, transparent 0%)",
                backgroundSize: "100px 100px",
              }}
            ></div>
          </div>
        </div>

        <div className="px-8 pb-8">
          {/* Profile Section */}
          <div className="flex flex-col items-center -mt-24">
            <div className="p-1.5 z-30  rounded-full bg-white shadow-lg">
              <img
                src={user.avatar || "https://via.placeholder.com/128"}
                alt={user.username}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>

            <h1 className="mt-6 text-3xl font-bold text-gray-800">
              {user.username}
            </h1>
            <p className="text-indigo-600 font-medium">{user.email}</p>

            {user.bio && (
              <div className="mt-5 text-center text-gray-600 max-w-lg">
                <p className="relative italic px-6">
                  <span className="absolute top-0 left-0 text-4xl text-indigo-200">
                    "
                  </span>
                  {user.bio}
                  <span className="absolute bottom-0 right-0 text-4xl text-indigo-200">
                    "
                  </span>
                </p>
              </div>
            )}
          </div>

          {/* Settings Section */}
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Account Settings
              </h2>
            </div>

            <div className="space-y-6">
              {/* Email Notifications */}
              <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition duration-300">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Email Notifications
                  </h3>
                  <p className="text-gray-500">
                    Receive email updates about your activity
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.emailNotifications}
                    onChange={handleEmailNotificationsChange}
                  />
                  <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>

              {/* Profile Visibility */}
              <div className="flex items-center justify-between p-5 bg-gray-50 rounded-xl hover:bg-gray-100 transition duration-300">
                <div>
                  <h3 className="font-semibold text-lg text-gray-800">
                    Profile Visibility
                  </h3>
                  <p className="text-gray-500">
                    Choose who can see your profile
                  </p>
                </div>
                <select
                  className="px-4 py-2.5 border border-gray-300 rounded-lg bg-white text-gray-800 font-medium shadow-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={settings.profileVisibility}
                  onChange={handleProfileVisibilityChange}
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-10 flex justify-end">
            <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition duration-300">
              Save Changes
            </button>
          </div>
        </div>
      </div>

      {/* Posts Section */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My Posts</h2>
          <div className="flex items-center">
            <div className="h-1 w-16 bg-indigo-600 rounded-full mr-4"></div>
            <span className="bg-indigo-100 text-indigo-800 text-sm font-medium px-3 py-1 rounded-full">
              {posts.length} Posts
            </span>
          </div>
        </div>

        <div className="space-y-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              {/* Post Image */}
              <div className="relative h-56 md:h-64 w-full overflow-hidden">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover transition duration-300 transform hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Post Content */}
              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">
                    {formatDate(post.createdAt)}
                  </span>
                  <div className="flex items-center">
                    <svg
                      className="h-5 w-5 text-red-500 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                    <span className="text-gray-600 font-medium">
                      {post.likes}
                    </span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {post.title}
                </h3>
                <div
                  className="text-gray-600 mb-4"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Post Comments Section */}
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-semibold text-gray-800">
                      Comments ({post.comments.length})
                    </h4>
                    <button className="text-indigo-600 text-sm font-medium hover:text-indigo-800 transition duration-200">
                      Add Comment
                    </button>
                  </div>

                  {post.comments.length > 0 ? (
                    <div className="space-y-4">
                      {post.comments.map((comment) => (
                        <div
                          key={comment.id}
                          className="p-4 bg-gray-50 rounded-xl"
                        >
                          <div className="flex items-start">
                            <img
                              src={comment.author.avatar}
                              alt={comment.author.username}
                              className="w-8 h-8 rounded-full mr-3"
                            />
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <h5 className="font-medium text-gray-800">
                                  {comment.author.username}
                                </h5>
                                <span className="text-xs text-gray-500">
                                  {formatDate(comment.createdAt)}
                                </span>
                              </div>
                              <p className="text-gray-600 text-sm">
                                {comment.content}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-4 text-gray-500 italic text-sm">
                      No comments yet. Be the first to comment!
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
