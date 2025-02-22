// src/pages/dashboard/Dashboard.js
import React from "react";
import { useAuth } from "../../AuthContext"; // Ajustez le chemin selon votre arborescence

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <h2 className="text-2xl font-semibold mb-4">
          Bienvenue {user ? user.name : "utilisateur"} sur le tableau de bord !
        </h2>
      </main>
    </div>
  );
};

export default Dashboard;
