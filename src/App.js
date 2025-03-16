// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/login";
import Dashboard from "./pages/acceuil/acceuil";
import Users from "./pages/users/index";
import DashboardHeader from "./pages/template/_header";
import EditUser from "./pages/users/edit";
import Posts from "./pages/posts/index";
import EditPost from "./pages/posts/edit";
import Categories from "./pages/categories/index";
import CreateCategory from "./pages/categories/create";
import EditCategory from "./pages/categories/edit";

import { useAuth } from "./AuthContext";

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Router>
      {isAuthenticated && <DashboardHeader />}
      <Routes>
        {/* La route par défaut pointe vers le composant Login */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/users/edit/:id" element={<EditUser />} />
        <Route path="/dashboard/posts" element={<Posts />} />
        <Route path="/dashboard/posts/edit/:id" element={<EditPost />} />
        <Route path="/dashboard/categories" element={<Categories />} />
        <Route
          path="/dashboard/categories/create"
          element={<CreateCategory />}
        />
        <Route
          path="/dashboard/categories/edit/:id"
          element={<EditCategory />}
        />
      </Routes>
    </Router>
  );
}

export default App;
