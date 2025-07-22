const express = require('express')
const cakeController = require('../controllers/cakesController')

const router = express.Router();

router.get("/", cakeController.getAllCakes);
router.get("/:_id", cakeController.getCakeById)
router.put("/:_id", cakeController.updateCakeById)
router.post("/", cakeController.postCake);
router.delete("/:_id", cakeController.deleteCakeById)

module.exports = router;
