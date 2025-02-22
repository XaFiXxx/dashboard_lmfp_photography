// src/pages/dashboard/Posts.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const fetchPosts = () => {
    const token = Cookies.get('auth_token'); // Récupérer le token depuis les cookies
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPosts(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement des posts.");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleEdit = (id) => {
    // Rediriger vers la page d'édition
    navigate(`/dashboard/posts/edit/${id}`);
  };

  const handleDelete = async (id) => {
    const token = Cookies.get('auth_token');
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // Actualiser la liste après suppression
      fetchPosts();
    } catch (err) {
      console.error("Erreur lors de la suppression", err);
      setError("Erreur lors de la suppression du post.");
    }
  };

  const handleCreate = () => {
    // Rediriger vers la page de création d'un nouveau post
    navigate(`/dashboard/posts/create`);
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
        <h2 className="text-2xl font-semibold mb-4">Liste des posts</h2>
        <button
          onClick={handleCreate}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Créer un post
        </button>
        <div className="overflow-x-auto mt-4">
          <table className="w-full bg-white border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="text-left px-4 py-2 border">Titre</th>
                <th className="text-left px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length > 0 ? (
                posts.map((post) => (
                  <tr key={post.id} className="text-center">
                    <td className="px-4 py-2 border">{post.title}</td>
                    <td className="px-4 py-2 border space-x-2">
                      <button
                        onClick={() => handleEdit(post.id)}
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Modifier
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      >
                        Supprimer
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-4 py-2 border">
                    Aucun post trouvé.
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

export default Posts;
