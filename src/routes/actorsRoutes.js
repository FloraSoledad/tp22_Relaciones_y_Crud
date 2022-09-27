const express = require('express');
const router = express.Router();
const actorsController = require('../controllers/actorsControllers');

router.get('/', actorsController.list);
router.get('/detail/:id', actorsController.detail);

/* router.get('/actors', actorsController.list);
router.get('/actors/detail/:id', actorsController.detail); */


module.exports = router;