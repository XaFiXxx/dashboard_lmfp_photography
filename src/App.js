// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/login";
import Dashboard from "./pages/acceuil/acceuil";
import Users from "./pages/users/index";
import DashboardHeader from "./pages/template/_header";
import EditUser from "./pages/users/edit";

function App() {
  return (
    <Router>
      <DashboardHeader />
      <Routes>
        {/* La route par défaut pointe vers le composant Login */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/users/edit/:id" element={<EditUser />} />
      </Routes>
    </Router>
  );
}

export default App;
