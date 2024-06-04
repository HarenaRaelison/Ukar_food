const pool = require('../../dbConnect')
const express = require('express')
const app = express()
const query = require('./queries')

const userNumber = async(req,res) => {
    const sql = query.userNumber;
    try {
        const result = await pool.query(sql);
        if (result != 0){
            res.status(200).json({userCount : result});
        }else{
            result.status(404).json({userCount : 0});
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
  
    }
}
module.exports = {
    userNumber
}