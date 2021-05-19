const { Router } = require('express');
const router = Router();

const {
  getProducts,
  createProducts,
} = require('../controller/products.controller');

router.get('/products', getProducts);
router.post('/products', createProducts);

module.exports = router;