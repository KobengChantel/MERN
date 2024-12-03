import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/ContextProvider";

const Navbar = ({ setQuery }) => {
  const { user, logout } = useAuth();
  
  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      {/* App Logo and Home Link */}
      <div className="text-xl font-bold">
        <Link to="/">NoteApp</Link>
      </div>

      {/* Search Input with onChange */}
      <input
        type="text"
        placeholder="Search notes..."
        className="bg-gray-600 px-4 py-2 rounded"
        aria-label="Search notes"
        onChange={(e) => setQuery(e.target.value)} // Pass the search query to the parent component
      />

      <div>
        {/* Conditionally render login/signup or user info and logout */}
        {!user ? (
          <>
            <Link to="/login" className="bg-blue-500 px-4 py-2 rounded-lg mr-4">
              Login
            </Link>
            <Link to="/signup" className="bg-green-500 px-4 py-2 rounded-lg mr-4">
              Signup
            </Link>
          </>
        ) : (
          <>
            {/* Display user name and logout button if the user is logged in */}
            <span className="mr-4">{user.name}</span>
            <button
              className="bg-red-500 px-4 py-2 rounded"
              onClick={logout} // Logout function
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
