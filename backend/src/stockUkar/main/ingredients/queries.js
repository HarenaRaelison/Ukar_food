const getIngred = 'SELECT * FROM ingredient'
const research = 'SELECT * FROM ingredient WHERE "nomIngred" ILIKE $1'  
const getIngredById = 'SELECT * FROM ingredient WHERE "idIngred" = $1'
const getIngredByNomCate = 'SELECT * from ingredient where "idCate" = $1'
const getNomCate = 'SELECT "NomCate" FROM categorie'
const deleteIngred = 'DELETE FROM ingredient WHERE "idIngred" = $1';
const updateIngred = 'UPDATE ingredient SET "nomIngred" = $1, "qteIngred" = $2 WHERE "idIngred" = $3';


module.exports ={
    deleteIngred,
    getIngred,
    research,
    getIngredById,
    getIngredByNomCate,
    getNomCate,
    updateIngred
}