import { PlusIcon, UserIcon } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 bg-black/50 text-white backdrop-blur-md z-30 shadow-sm">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link className="flex items-center gap-2 " to="/">
          <img className="h-10 w-13" src={logo} />
          <span className="font-bold text-xl">BlogApp</span>
        </Link>
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex space-x-6">
            <Link
              to="/createPost"
              className="flex items-center space-x-2 p-3 rounded-md cursor-pointer hover:bg-gray-100 hover:text-black transition-all duration-300"
            >
              <PlusIcon className="h-5 w-5  group-hover:text-black" />
              <span className=" group-hover:text-white">Create Post</span>
            </Link>
            <Link
              to="/profile"
              className="flex items-center space-x-2 p-3 rounded-md cursor-pointer hover:bg-gray-100 hover:text-black transition-all duration-300"
            >
              <UserIcon className="h-5 w-5 group-hover:text-black" />
              <span className=" group-hover:text-white">Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
