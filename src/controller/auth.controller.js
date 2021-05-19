const { Pool } = require('pg');
const { config } = require('../config/index');
const pool = new Pool(config);
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const authController = async (req, res) => {
  const { usuario } = req.body;
  try {
    const usersDB = await pool.query(
      `SELECT password FROM usuarios WHERE usuario = '${usuario}'`
    );
    const passwDB = usersDB.rows[0].password;
    if (bcrypt.compareSync(req.body.password, passwDB)) {
      const response = await pool.query(
        `SELECT * FROM usuarios WHERE usuario = '${usuario}' and password = '${passwDB}'`
      );
      if (response.rows.length > 0) {
        jwt.sign(
          { user: usuario },
          'secretpassw',
          { expiresIn: '1h' },
          (err, token) => {
            res.status(200).json({
              msg: 'Autenticación satisfactoria',
              token: token,
            });
          }
        );
      }
    } else {
      res.json({ estado: false, message: 'Autenticación fallida' });
    }
  } catch (ex) {
    res.json({ estado: false, message: 'Autenticación fallida' });
  }
};

module.exports = {
  authController,
};
