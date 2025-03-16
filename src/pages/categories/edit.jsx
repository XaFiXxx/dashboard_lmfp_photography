import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditCategory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Récupérer les données de la catégorie
  useEffect(() => {
    const token = Cookies.get("auth_token");
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/dash/category/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const category = response.data;
        setFormData({
          name: category.name || "",
          description: category.description || "",
        });
      })
      .catch((err) => {
        console.error(err);
        setError("Erreur lors du chargement de la catégorie.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = Cookies.get("auth_token");
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/dash/category/${id}/edit`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        toast.success("Catégorie mise à jour avec succès !");
        // Redirection vers la liste des catégories après 2 secondes
        setTimeout(() => {
          navigate("/dashboard/categories");
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Erreur lors de la mise à jour de la catégorie.");
      });
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">Chargement en cours...</div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4 text-red-500">{error}</div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-4">Modifier la catégorie</h1>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-6 rounded shadow"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 font-medium mb-2"
          >
            Nom de la catégorie
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-3 py-2 border border-gray-300 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default EditCategory;
