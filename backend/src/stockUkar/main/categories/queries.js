const getCategories = 'SELECT "NomCate","idCate" FROM categorie';
const getCategorieById = 'SELECT * FROM categorie WHERE "idCate" = $1';
const addCategorie = 'INSERT INTO categorie ("NomCate", "descriCate") VALUES ($1, $2) RETURNING *';
const updateCategorie = 'UPDATE categorie SET "NomCate" = $1, "descriCate" = $2 WHERE "idCate" = $3';
const deleteCategorie = 'DELETE FROM categorie WHERE "idCate" = $1';

module.exports = {
  getCategories,
  getCategorieById,
  addCategorie,
  updateCategorie,
  deleteCategorie,
};
