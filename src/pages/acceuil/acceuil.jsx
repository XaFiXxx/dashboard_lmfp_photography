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
