const { Pool } = require('pg');
const { config } = require('../config/index');
const pool = new Pool(config);

const getDetail = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query(`SELECT * FROM detallefactura where id = ${id}`);
  res.status(200).json(response.rows);
};

const getDetails = async (req, res) => {
  const response = await pool.query('SELECT * FROM detallefactura');
  res.status(200).json(response.rows);
};
module.exports = {
    getDetail,
    getDetails
  };
  