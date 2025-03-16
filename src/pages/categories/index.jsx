import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const fetchCategories = () => {
    const token = Cookies.get('auth_token'); // Récupérer le token depuis les cookies
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/dash/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des catégories.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleEdit = (id) => {
    // Rediriger vers la page d'édition d'une catégorie
    navigate(`/dashboard/categories/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const token = Cookies.get('auth_token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/dash/category/${id}/delete`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Actualiser la liste après suppression
      fetchCategories();
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
      setError("Erreur lors de la suppression de la catégorie.");
    }
  };

  const handleCreate = () => {
    // Rediriger vers la page de création d'une nouvelle catégorie
    navigate(`/dashboard/categories/create`);
  };

  if (loading) {
    return <div className="container mx-auto p-4">Chargement en cours...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Gestion des catégories</h2>
          <button 
            onClick={handleCreate}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Créer une catégorie
          </button>
        </div>
        <div className="overflow-x-auto mt-4">
          <table className="w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 border">Nom</th>
                <th className="text-left px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category) => (
                  <tr key={category.id} className="text-center">
                    <td className="px-4 py-2 border">{category.name}</td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        onClick={() => handleEdit(category.id)}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(category.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-4 py-2 border text-center">
                    Aucune catégorie trouvée.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Categories;
