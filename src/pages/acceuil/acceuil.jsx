// src/pages/dashboard/Dashboard.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext"; // Ajustez le chemin si besoin

const Dashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/"); // Redirection vers la page de login après déconnexion
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* En-tête avec menu de navigation et bouton Logout */}
      <header className="bg-blue-600 text-white p-4">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">Dashboard</h1>
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
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Logout
            </button>
          </nav>
        </div>
      </header>

      {/* Contenu principal */}
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Bienvenue {user ? user.name : "utilisateur"} sur le tableau de bord !
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Carte Statistique 1 */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-bold mb-2">Statistique 1</h3>
            <p>Contenu ou graphique ici</p>
          </div>
          {/* Carte Statistique 2 */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-bold mb-2">Statistique 2</h3>
            <p>Contenu ou graphique ici</p>
          </div>
          {/* Carte Statistique 3 */}
          <div className="bg-white rounded shadow p-4">
            <h3 className="text-lg font-bold mb-2">Statistique 3</h3>
            <p>Contenu ou graphique ici</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
