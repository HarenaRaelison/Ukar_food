const pool = require('../dbConnect')
const express = require('express')
const app = express()
app.use(express.json())
const checkUser = async (req, res) => {
  const {Name , Password} = req.body
 
  console.log(Name)
  console.log(Password)
  
  const query = 'SELECT "nameUser", "passUser" FROM public.users WHERE "nameUser" = $1 AND "passUser" = $2';

  try {
    const result = (await pool.query(query,[Name,Password]))
    if (result.rowCount === 0 ){
      res.status(401).send('Unauthorized');
    }else{
      console.log('succés')
      res.status(200).send('OK')
    }

  } catch (error) {
    console.log(error)
    res.status(500).send('Internal server error')
  }
  
};

module.exports = {
  checkUser 
}
