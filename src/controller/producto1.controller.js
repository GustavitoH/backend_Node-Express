const { Pool } = require('pg');
const { config } = require('../config/index');
const pool = new Pool(config);
const { response } = require('express');

const getProducts = async (req, res) => {
    const response = await pool.query('SELECT * FROM productos');
    res.status(200).json(response.rows);
};

const createProducts = async (req, res) => {
    const { nombre, precio, cantidad} = req.body;
    const response = await pool.query(
    `INSERT INTO productos (nombre, precio, cantidad) VALUES ('${nombre}','${precio}}','${cantidad}',true)`
    );
};

module.exports = {
    getProducts, 
    createProducts,
}