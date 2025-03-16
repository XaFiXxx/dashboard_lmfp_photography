// src/pages/dashboard/EditPost.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [postData, setPostData] = useState({
    title: '',
    description: '',
    image: '', // stocke le chemin de l'image ou le nouveau fichier sélectionné
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Récupération des données du post à modifier
  useEffect(() => {
    const token = Cookies.get('auth_token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // Utilisation des champs title et description (et image) selon la réponse du serveur
        setPostData({
          title: response.data.title,
          description: response.data.description,
          image: response.data.image,
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement du post.");
        setLoading(false);
      });
  }, [id]);

  // Mise à jour des champs texte
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPostData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Gestion du changement d'image (upload)
  const handleImageChange = (e) => {
    setPostData((prevData) => ({
      ...prevData,
      image: e.target.files[0],
    }));
  };

  // Envoi des modifications vers l'API
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('auth_token');

    // Préparer les données à envoyer : utiliser FormData si une nouvelle image est sélectionnée
    const formData = new FormData();
    formData.append('title', postData.title);
    formData.append('description', postData.description);
    if (postData.image && postData.image instanceof File) {
      formData.append('image', postData.image);
    }

    axios
      .put(`${process.env.REACT_APP_API_URL}/api/dash/posts/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        // Redirection vers la liste des posts après mise à jour
        navigate('/dashboard/posts');
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors de la mise à jour du post.");
      });
  };

  if (loading) return <div className="container mx-auto p-4">Chargement...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Modifier un post</h1>
      <form onSubmit={handleSubmit}>
        {/* Champ Titre */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 mb-2">
            Titre
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={postData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Champ Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 mb-2">
            Contenu
          </label>
          <textarea
            id="description"
            name="description"
            value={postData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        {/* Affichage de l'image actuelle */}
        {postData.image && typeof postData.image === 'string' && (
          <div className="mb-4">
            <p className="text-gray-700 mb-2">Image du post actuelle :</p>
            <img
              src={`${process.env.REACT_APP_API_URL}${postData.image}`}
              alt="Post"
              className="max-w-xs"
            />
          </div>
        )}

        {/* Possibilité de modifier l'image */}
        <div className="mb-4">
          <label htmlFor="image" className="block text-gray-700 mb-2">
            Modifier l'image
          </label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            className="w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Enregistrer
        </button>
      </form>
    </div>
  );
};

export default EditPost;
