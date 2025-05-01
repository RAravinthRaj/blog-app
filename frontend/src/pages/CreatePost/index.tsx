import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Image, X, Check, AlertCircle, PenLine } from "lucide-react";
import { Navbar } from "../../components";

// Component for the create post form
const CreatePost = () => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    category: "",
    coverImage: "",
    content: "",
    tags: [] as string[],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [previewImage, setPreviewImage] = useState("");
  const [currentTag, setCurrentTag] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [formStep, setFormStep] = useState(1);

  // Categories with colors
  const categories = [
    { value: "Technology", color: "bg-blue-100 text-blue-700 border-blue-300" },
    { value: "Design", color: "bg-pink-100 text-pink-700 border-pink-300" },
    {
      value: "Business",
      color: "bg-green-100 text-green-700 border-green-300",
    },
    {
      value: "Lifestyle",
      color: "bg-yellow-100 text-yellow-700 border-yellow-300",
    },
    {
      value: "Health",
      color: "bg-purple-100 text-purple-700 border-purple-300",
    },
  ];

  // Update form data
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  // Handle image preview
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setPreviewImage(url);
    handleChange(e);
  };

  // Add a tag
  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData({
        ...formData,
        tags: [...formData.tags, currentTag.trim()],
      });
      setCurrentTag("");
    }
  };

  // Remove a tag
  const removeTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  // Handle tag input keydown (add tag on Enter)
  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.excerpt.trim()) newErrors.excerpt = "Excerpt is required";
    if (!formData.category) newErrors.category = "Please select a category";
    if (!formData.content.trim()) newErrors.content = "Content is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      setIsSubmitting(true);

      // Simulating API call
      setTimeout(() => {
        setIsSubmitting(false);
        setShowSuccessMessage(true);

        // Redirect after showing success message
        setTimeout(() => {
          // navigate('/dashboard');
          console.log("Form submitted:", formData);
        }, 2000);
      }, 1500);
    }
  };

  // Move to next step in multi-step form
  const goToNextStep = () => {
    // Validate current step before proceeding
    let currentStepValid = true;
    const newErrors: Record<string, string> = {};

    if (formStep === 1) {
      if (!formData.title.trim()) {
        newErrors.title = "Title is required";
        currentStepValid = false;
      }
      if (!formData.excerpt.trim()) {
        newErrors.excerpt = "Excerpt is required";
        currentStepValid = false;
      }
      if (!formData.category) {
        newErrors.category = "Please select a category";
        currentStepValid = false;
      }
    }

    setErrors(newErrors);

    if (currentStepValid) {
      setFormStep(formStep + 1);
    }
  };

  // Go back to previous step
  const goToPreviousStep = () => {
    setFormStep(formStep - 1);
  };

  // Form step indicators
  const FormStepIndicator = () => (
    <div className="flex items-center justify-center mb-8 py-4 px-6 bg-gray-300 rounded-full shadow-md">
      <div className="flex items-center">
        {/* Step 1 */}
        <div
          className={`rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg ${
            formStep == 1
              ? "bg-black text-white border-2 border-primary-700"
              : "bg-gray-400 text-gray-700"
          } transition-all duration-300 ease-in-out`}
          onClick={() => {
            setFormStep(1);
          }}
        >
          1
        </div>

        {/* Connector Line */}
        <div
          className={`h-1 w-12 ${
            formStep >= 2 ? "bg-gray-800" : "bg-gray-800"
          } transition-all duration-300 ease-in-out`}
        ></div>

        {/* Step 2 */}
        <div
          className={`rounded-full h-12 w-12 flex items-center justify-center font-bold text-lg ${
            formStep == 2
              ? "bg-black text-white border-2 border-primary-700"
              : "bg-gray-400 text-gray-700"
          } transition-all duration-300 ease-in-out`}
          onClick={() => {
            setFormStep(2);
          }}
        >
          2
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <div className="mb-16">
        <Navbar />
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-4xl mx-auto px-4 py-8 "
      >
        <AnimatePresence>
          {showSuccessMessage ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="bg-green-50 border border-green-200 rounded-xl p-6 text-center shadow-lg"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-green-700 mb-2">
                Post Created Successfully!
              </h2>
              <p className="text-green-600 mb-4">
                Your post has been published and is now live.
              </p>
              <button
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
                onClick={() => navigate("/dashboard")}
              >
                View Your Posts
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-xl overflow-hidden"
            >
              <div className="bg-gradient-to-r flex flex-col items-center justify-center from-primary-600 to-primary-700 p-6">
                <div className="flex items-center space-x-3">
                  <PenLine className="h-6 w-6 text-black" />
                  <h1 className="text-2xl font-bold text-black">
                    Create New Post
                  </h1>
                </div>
                <p className="text-primary-100 mt-2">
                  Share your knowledge with the community
                </p>
              </div>

              <div className="p-8">
                <FormStepIndicator />

                <form onSubmit={handleSubmit} className="space-y-6">
                  {formStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Title Field */}
                      <div>
                        <label
                          htmlFor="title"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Title <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="title"
                          name="title"
                          value={formData.title}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.title ? "border-red-500" : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                          placeholder="Enter an engaging title for your post"
                        />
                        {errors.title && (
                          <div className="flex items-center mt-1 text-sm text-red-600">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span>{errors.title}</span>
                          </div>
                        )}
                      </div>

                      {/* Excerpt Field */}
                      <div>
                        <label
                          htmlFor="excerpt"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Excerpt <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="excerpt"
                          name="excerpt"
                          value={formData.excerpt}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.excerpt
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                          placeholder="A brief summary of your post (will appear in previews)"
                        />
                        {errors.excerpt && (
                          <div className="flex items-center mt-1 text-sm text-red-600">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span>{errors.excerpt}</span>
                          </div>
                        )}
                      </div>

                      {/* Category Selection */}
                      <div>
                        <label
                          htmlFor="category"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Category <span className="text-red-500">*</span>
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                          {categories.map((category) => (
                            <div key={category.value}>
                              <input
                                type="radio"
                                id={category.value}
                                name="category"
                                value={category.value}
                                checked={formData.category === category.value}
                                onChange={handleChange}
                                className="hidden peer"
                              />
                              <label
                                htmlFor={category.value}
                                className={`block border rounded-lg p-3 text-center cursor-pointer transition-all ${
                                  formData.category === category.value
                                    ? category.color + " border-2"
                                    : "border-gray-200 hover:border-gray-300"
                                } peer-checked:border-2`}
                              >
                                {category.value}
                              </label>
                            </div>
                          ))}
                        </div>
                        {errors.category && (
                          <div className="flex items-center mt-1 text-sm text-red-600">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span>{errors.category}</span>
                          </div>
                        )}
                      </div>

                      {/* Cover Image Field */}
                      <div>
                        <label
                          htmlFor="coverImage"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Cover Image URL
                        </label>
                        <div className="flex items-center">
                          <div className="relative flex-grow">
                            <input
                              type="url"
                              id="coverImage"
                              name="coverImage"
                              value={formData.coverImage}
                              onChange={handleImagePreview}
                              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                              placeholder="https://example.com/image.jpg"
                            />
                            <Image className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          </div>
                        </div>
                        <AnimatePresence>
                          {previewImage && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-3 relative overflow-hidden rounded-lg border border-gray-200"
                            >
                              <img
                                src={previewImage}
                                alt="Preview"
                                className="w-full h-56 object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "https://via.placeholder.com/800x400?text=Invalid+Image+URL";
                                }}
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setPreviewImage("");
                                  setFormData({ ...formData, coverImage: "" });
                                }}
                                className="absolute top-2 right-2 bg-white/80 p-1 rounded-full hover:bg-white transition-all"
                              >
                                <X className="h-5 w-5 text-gray-700" />
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Tags Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tags
                        </label>
                        <div className="flex">
                          <input
                            type="text"
                            value={currentTag}
                            onChange={(e) => setCurrentTag(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            className="flex-grow px-4 py-3 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                            placeholder="Add tags (press Enter after each tag)"
                          />
                          <button
                            type="button"
                            onClick={addTag}
                            className="px-4 py-3 bg-gray-100 hover:bg-gray-200 border border-l-0 border-gray-300 rounded-r-lg transition-colors"
                          >
                            Add
                          </button>
                        </div>

                        <div className="flex flex-wrap gap-2 mt-2">
                          {formData.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-gray-100 text-gray-800"
                            >
                              #{tag}
                              <button
                                type="button"
                                onClick={() => removeTag(tag)}
                                className="ml-1 text-gray-500 hover:text-gray-700"
                              >
                                <X className="h-3.5 w-3.5" />
                              </button>
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {formStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-6"
                    >
                      {/* Content Field */}
                      <div>
                        <label
                          htmlFor="content"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Content <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="content"
                          name="content"
                          value={formData.content}
                          onChange={handleChange}
                          rows={12}
                          className={`w-full px-4 py-3 rounded-lg border ${
                            errors.content
                              ? "border-red-500"
                              : "border-gray-300"
                          } focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all`}
                          placeholder="Write your post content here..."
                        />
                        {errors.content && (
                          <div className="flex items-center mt-1 text-sm text-red-600">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            <span>{errors.content}</span>
                          </div>
                        )}
                        <div className="text-xs text-gray-500 mt-2">
                          Tip: You can use Markdown formatting for headings,
                          lists, code blocks, etc.
                        </div>
                      </div>

                      {/* Post Summary */}
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <h3 className="font-medium text-gray-700 mb-2">
                          Post Summary
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Title</p>
                            <p className="font-medium">
                              {formData.title || "—"}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Category</p>
                            <p className="font-medium">
                              {formData.category || "—"}
                            </p>
                          </div>
                          <div className="md:col-span-2">
                            <p className="text-sm text-gray-500">Excerpt</p>
                            <p>{formData.excerpt || "—"}</p>
                          </div>
                          {formData.tags.length > 0 && (
                            <div className="md:col-span-2">
                              <p className="text-sm text-gray-500">Tags</p>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {formData.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="px-2 py-0.5 rounded-full bg-gray-200 text-xs"
                                  >
                                    #{tag}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div className="flex justify-between pt-4 mt-8 border-t border-gray-200">
                    {formStep > 1 ? (
                      <button
                        type="button"
                        onClick={goToPreviousStep}
                        className="px-5 py-0 border border-gray-300 rounded-lg hover:bg-gray-50 font-sm transition-colors"
                      >
                        Back
                      </button>
                    ) : (
                      <div></div>
                    )}

                    {formStep < 2 ? (
                      <motion.button
                        type="button"
                        onClick={goToNextStep}
                        className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Continue
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        className={`px-5 py-2.5 ${
                          isSubmitting
                            ? "bg-gray-400"
                            : "bg-primary-600 hover:bg-primary-700"
                        } text-black rounded-lg font-medium transition-colors flex items-center`}
                        whileHover={isSubmitting ? {} : { scale: 1.02 }}
                        whileTap={isSubmitting ? {} : { scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-black"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Publishing...
                          </>
                        ) : (
                          <div className="px-5 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                            Publish Post
                          </div>
                        )}
                      </motion.button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default CreatePost;
