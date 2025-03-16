// src/components/DashboardHeader.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Ajustez le chemin selon votre arborescence

const DashboardHeader = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/dashboard" className="hover:underline">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link to="/dashboard/users" className="hover:underline">
            Users
          </Link>
          <Link to="/dashboard/posts" className="hover:underline">
            Posts
          </Link>
          <Link to="/dashboard/galerie" className="hover:underline">
            Galerie
          </Link>
          <Link to="/dashboard/categories" className="hover:underline">
            Catégories
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default DashboardHeader;
