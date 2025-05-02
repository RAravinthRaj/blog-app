import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { register } from "../../api"; // Import the correct register API function

interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setError("");
    if (data.password !== data.confirmPassword) {
      setError("Passwords do not match.");
      setIsSubmitting(false);
      return;
    }
    try {
      const response = await register(data); // Use the register function from your API
      localStorage.setItem("token", response.data.token);
      navigate("/home"); // Redirect to the home page after successful registration
    } catch (error) {
      setError("Error occurred during registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 sm:p-10">
        <h1 className="text-4xl font-extrabold text-transparent text-center bg-clip-text bg-gradient-to-r from-indigo-600 to-pink-500 mb-2">
          Create Account
        </h1>
        <p className="text-center text-gray-500 mb-6">Join us to get started</p>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-100 text-sm text-red-700 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              {...formRegister("username", {
                required: "Username is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.username && (
              <p className="text-sm text-red-600 mt-1">
                {errors.username.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              {...formRegister("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {errors.email && (
              <p className="text-sm text-red-600 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="space-y-2">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...formRegister("password", {
                required: "Password is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...formRegister("confirmPassword", {
                required: "Confirm Password is required",
              })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Confirm your password"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="text-gray-400 hover:text-gray-600 focus:outline-none"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
            {newPassword !== confirmPassword && (
              <p className="text-sm text-red-600 mt-1">
                Passwords do not match
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating account..." : "Create Account"}
          </button>
        </form>

        {/* Link to login */}
        <p className="mt-6 text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
