const { Pool } = require('pg');
const { config } = require('../config/index');
const pool = new Pool(config);
const bcrypt = require('bcrypt');
const { response } = require('express');

const getUser = async (req, res) => {
  const id = req.params.id;
  const response = await pool.query(`SELECT * FROM usuarios where id = ${id}`);
  res.status(200).json(response.rows);
};

const getUsers = async (req, res) => {
  const response = await pool.query('SELECT * FROM usuarios');
  res.status(200).json(response.rows);
};

const createUser = async (req, res) => {
  const { nombre, apellido, usuario, password } = req.body;
  var passwordcrypt = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const response = await pool.query(
    `INSERT INTO usuarios (nombre, apellido, usuario, password, estado) VALUES ('${nombre}','${apellido}','${usuario}','${passwordcrypt}',true)`
  );
  if (response) {
    res.json({
      message: 'Guardado con éxito',
    });
  }
  if (!response) {
    res.json({
      message: 'Guardado no realizado',
    });
  }
};

const updateUser = async (req, res) => {
  const id = parseInt(req.params.id);

  const { nombre, apellido, usuario, password } = req.body;
  var passwordcrypt = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const response = await pool.query(
    `UPDATE usuarios SET nombre = '${nombre}', apellido = '${apellido}', usuario = '${usuario}', password = '${passwordcrypt}' WHERE id = ${id}`
  );
  if (response) {
    res.json({
      message: 'Actualización exitosa',
    });
  }
  if (!response) {
    res.json({
      message: 'Actualización no realizada',
    });
  }
};
const deleteUser = async (req, res) => {
  const id = parseInt(req.params.id);
  const response = await pool.query(
    `UPDATE usuarios SET estado = false WHERE id = ${id}`
  );
  if (response) {
    res.json({
      message: 'Eliminación exitosa',
      estado: true,
    });
  }
  if (!response) {
    res.json({
      message: 'Eliminación no realizada',
      estado: false,
    });
  }
};
module.exports = {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
};
