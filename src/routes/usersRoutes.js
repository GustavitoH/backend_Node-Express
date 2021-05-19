const { Router } = require('express');
const router = Router();

const {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser,
} = require('../controller/users.controller');

router.get('/users/:id', getUser);
router.get('/users', getUsers);
router.post('/users', createUser);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

module.exports = router;
