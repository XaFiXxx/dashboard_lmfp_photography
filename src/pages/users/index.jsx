// src/pages/dashboard/Users.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const fetchUsers = () => {
    const token = Cookies.get('auth_token'); // Récupérer le token depuis les cookies
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/dash/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des utilisateurs.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (id) => {
    // Rediriger vers la page d'édition (à créer)
    navigate(`/dashboard/users/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const token = Cookies.get('auth_token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/dash/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Actualiser la liste après suppression
      fetchUsers();
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
      setError("Erreur lors de la suppression de l'utilisateur.");
    }
  };

  const handleCreate = () => {
    // Rediriger vers la page de création d'un nouvel utilisateur (à créer)
    navigate(`/dashboard/users/create`);
  };

  if (loading) {
    return <div className="container mx-auto p-4">Chargement...</div>;
  }

  if (error) {
    return <div className="container mx-auto p-4 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Gestion des utilisateurs</h2>
        <button 
          onClick={handleCreate}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Créer un utilisateur
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 border">ID</th>
              <th className="px-4 py-2 border">Nom</th>
              <th className="px-4 py-2 border">Prénom</th>
              <th className="px-4 py-2 border">Anniversaire</th>
              <th className="px-4 py-2 border">Email</th>
              <th className="px-4 py-2 border">Rôle</th>
              <th className="px-4 py-2 border">Admin</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.id} className="text-center">
                  <td className="px-4 py-2 border">{user.id}</td>
                  <td className="px-4 py-2 border">{user.lastname}</td>
                  <td className="px-4 py-2 border">{user.firstname}</td>
                  <td className="px-4 py-2 border">{user.birthday}</td>
                  <td className="px-4 py-2 border">{user.email}</td>
                  <td className="px-4 py-2 border">{user.role}</td>
                  <td className="px-4 py-2 border">
                    {user.isAdmin ? 'Oui' : 'Non'}
                  </td>
                  <td className="px-4 py-2 border space-x-2">
                    <button
                      onClick={() => handleEdit(user.id)}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    >
                      Supprimer
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="px-4 py-2 border">
                  Aucun utilisateur trouvé.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
