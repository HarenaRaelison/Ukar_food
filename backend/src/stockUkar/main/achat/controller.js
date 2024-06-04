const pool = require('../../dbConnect');

// Ajouter un achat
const addAchat = async (req, res) => {
  try {
    const { achats } = req.body;

    if (!achats || !Array.isArray(achats)) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    for (let achat of achats) {
      const { idIngred, qteAchat } = achat;
      console.log(achat);

      // Validation basique des données
      if (!idIngred || !qteAchat || qteAchat <= 0) {
        return res.status(400).json({ message: 'Invalid ingredient data' });
      }

      // Ajouter la quantité achetée à l'ingrédient dans la base de données
      await pool.query(
        'UPDATE ingredient SET "qteIngred" = "qteIngred" + $1 WHERE "idIngred" = $2',
        [qteAchat, idIngred]
      );

      // Enregistrer l'achat dans la table des achats
      const dateAchat = new Date().toISOString().slice(0, 10); // Format YYYY-MM-DD
      await pool.query(
        'INSERT INTO achat ("idIngred", "dateAchat", "qteAchat") VALUES ($1, $2, $3)',
        [idIngred, dateAchat, qteAchat]
      );
    }

    res.status(200).json({ message: 'Achats ajoutés avec succès' });
  } catch (error) {
    console.error('Error adding achat:', error);
    res.status(500).json({ message: 'Erreur lors de l\'ajout des achats' });
  }
};

module.exports = {
  addAchat
};
