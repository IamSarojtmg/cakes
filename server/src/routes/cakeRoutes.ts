const express = require('express')
const cakeController = require('../controllers/cakesController')

const router = express.Router();

router.get("/", cakeController.getAllCakes);
router.post("/", cakeController.postCake);

module.exports = router;
