const { Router } = require('express');
const router = Router();

const {
  getDetail,
  getDetails,
} = require('../controller/detailProd.controller');

router.get('/detail/:id', getDetail);
router.get('/detail', getDetails);

module.exports = router;
