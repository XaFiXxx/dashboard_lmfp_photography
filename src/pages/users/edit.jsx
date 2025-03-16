// src/pages/dashboard/EditUser.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    birthday: '',
    role: '',
    isAdmin: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Récupérer les données de l'utilisateur via l'API
  useEffect(() => {
    const token = Cookies.get('auth_token');
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/dash/user/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUserData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors de la récupération de l'utilisateur.");
        setLoading(false);
      });
  }, [id]);

  // Gérer la modification des champs du formulaire
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Envoi de la requête PUT pour mettre à jour l'utilisateur
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get('auth_token');
    axios
      .post(`${process.env.REACT_APP_API_URL}/api/dash/user/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // Redirection vers la liste des utilisateurs après modification
        navigate('/dashboard/users');
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors de la modification de l'utilisateur.");
      });
  };

  if (loading) return <div className="container mx-auto p-4">Chargement...</div>;
  if (error) return <div className="container mx-auto p-4 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Modifier l'utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="firstname" className="block mb-2">Prénom</label>
          <input
            type="text"
            id="firstname"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lastname" className="block mb-2">Nom</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block mb-2">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="birthday" className="block mb-2">Anniversaire</label>
          <input
            type="date"
            id="birthday"
            name="birthday"
            value={userData.birthday}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <select name="role" id="role" value={userData.role} onChange={handleChange} className="border p-2 w-full">
              <option value="visiteur">Visiteur</option>
              <option value="mannequin">Mannequin</option>
              <option value="photographe">Photographe</option>
              <option value="photographe">Oraganisateur d'évennement</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="isAdmin" className="inline-flex items-center">
            <input
              type="checkbox"
              id="isAdmin"
              name="isAdmin"
              checked={userData.isAdmin}
              onChange={handleChange}
              className="mr-2"
            />
            Administrateur
          </label>
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

export default EditUser;
