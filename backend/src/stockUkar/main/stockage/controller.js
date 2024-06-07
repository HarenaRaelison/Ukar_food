const pool = require('../../dbConnect'); // Assurez-vous que le chemin est correct

// Ajoute un mouvement de stock
const addStockMovement = async (req, res) => {
    const { stockMovements } = req.body;

    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        for (const movement of stockMovements) {
            const { idIngred, typemouvstock, qteUtils, datestock } = movement;

            // Insérer le mouvement de stock
            const insertStockQuery = `
                INSERT INTO public.stock("idIngred", typemouvstock, datestock, "qteUtils")
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;
            const stockResult = await client.query(insertStockQuery, [idIngred, typemouvstock, datestock, qteUtils]);

            // Mettre à jour la quantité de l'ingrédient
            const updateIngredientQuery = `
                UPDATE public.ingredient
                SET "qteIngred" = "qteIngred" + $1
                WHERE "idIngred" = $2
                RETURNING *;
            `;

            const qteChange = typemouvstock === 'entrée' ? qteUtils : -qteUtils;
            const ingredientResult = await client.query(updateIngredientQuery, [qteChange, idIngred]);

            if (ingredientResult.rowCount === 0) {
                throw new Error(`Ingredient with id ${idIngred} not found`);
            }
        }

        await client.query('COMMIT');
        res.status(201).json({ message: 'Stock movements added successfully' });
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error adding stock movement:', error);
        res.status(500).json({ error: 'An error occurred while adding stock movements' });
    } finally {
        client.release();
    }
};

module.exports = {
    addStockMovement
};
