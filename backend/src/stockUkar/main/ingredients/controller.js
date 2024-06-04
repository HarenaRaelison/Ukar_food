const pool = require('../../dbConnect')
const express = require('express')

const queries = require('./queries')
const deleteIngredient = async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        await pool.query(queries.deleteIngred, [id]);
        res.status(200).json({ message: 'Ingrédient supprimé avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression de l\'ingrédient' });
    }
};
const addIngredient = async (req, res) => {
    const { nomIngred, qteIngred, idCate, prixIngred } = req.body;
  
    try {
      const newIngredient = await pool.query(
        'INSERT INTO ingredient ("nomIngred", "qteIngred","idCate", "prixIngred") VALUES ($1, $2, $3, $4)',
        [nomIngred, qteIngred, idCate, prixIngred]
      );
      res.status(201).json(newIngredient.rows[0]);
    } catch (error) {
      res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'ajout de l\'ingrédient' });
    }
  };
const updateIngredient = async (req, res) => {
    const { id } = req.params;
    const { nomIngred, qteIngred } = req.body;
    try {
        await pool.query(queries.updateIngred, [nomIngred, qteIngred, id]);
        res.status(200).json({ message: 'Ingrédient modifié avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Une erreur s\'est produite lors de la modification de l\'ingrédient' });
    }
};
const getIngredient = async (req,res) => {
    try {
        await pool.query(queries.getIngred,(err,result) => {
            if (err) throw err;    
            res.status(200).json(result.rows)
        })
        
    } catch (error) {
        res.status(500).json({error : 'Une erreur s\'est produite'}  )
    }
}
const getIngredById = async (req,res) =>{
    const id =  parseInt(req.params.id)
    try {
        await pool.query(queries.getIngredById,[id],(err,result) =>{
            if(err) throw err;
            res.status(200).json(result.rows)
        })
    } catch (error) {
        
    }
}
const searchIngred = async (req, res) => {

    const data = req.params.elementSearch;
    await pool.query(queries.research,[`%${data}%`], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result);
    });
}
const searchByCate = async (req,res) => {
    const id = parseInt(req.params.id)
    await pool.query(queries.getIngredByNomCate,[id],(error,result) =>{
        if(error){
            throw error
        }else{
            res.status(200).json(result.rows)
        }
    })
}
const listNomCate = async (req,res) =>{
    await pool.query(queries.getNomCate,(err,result) =>{
        if (err) throw err;
        res.status(200).json(result.rows)
    })
}

 
module.exports = {
    addIngredient,
    getIngredient, 
    searchIngred,
    getIngredById,
    searchByCate,
    listNomCate,
    deleteIngredient,
    updateIngredient
}