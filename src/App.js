// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/auth/login/login";
import Dashboard from "./pages/acceuil/acceuil";

function App() {
  return (
    <Router>
      <Routes>
        {/* La route par défaut pointe vers le composant Login */}
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
