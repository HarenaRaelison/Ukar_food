const pool = require('../../dbConnect');
const queries = require('./queries');

const getCategories = async (req, res) => {
  try {
    const categories = await pool.query(queries.getCategories);
    res.status(200).json(categories.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération des catégories." });
  }
};

const getCategorieById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const categorie = await pool.query(queries.getCategorieById, [id]);
    res.status(200).json(categorie.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la récupération de la catégorie." });
  }
};

const addCategorie = async (req, res) => {
  const { NomCate, descriCate } = req.body;
  try {
    const newCategorie = await pool.query(queries.addCategorie, [NomCate, descriCate]);
    res.status(201).json(newCategorie.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de l'ajout de la catégorie." });
  }
};

const updateCategorie = async (req, res) => {
  const id = parseInt(req.params.id);
  const { NomCate, descriCate } = req.body;
  try {
    await pool.query(queries.updateCategorie, [NomCate, descriCate, id]);
    res.status(200).json({ message: "Catégorie modifiée avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la modification de la catégorie." });
  }
};

const deleteCategorie = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    await pool.query(queries.deleteCategorie, [id]);
    res.status(200).json({ message: "Catégorie supprimée avec succès." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Une erreur s'est produite lors de la suppression de la catégorie." });
  }
};

module.exports = {
  getCategories,
  getCategorieById,
  addCategorie,
  updateCategorie,
  deleteCategorie,
};
