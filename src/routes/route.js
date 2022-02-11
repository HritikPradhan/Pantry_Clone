const express = require('express');
const router = express.Router();
const pantryController = require('../Controller/pantryController')
const basketController=require('../Controller/basketController')

//Pantry
router.post("/createpantry",pantryController.createPantry)
router.get("/pantry/:pantryId",pantryController.getPantry)

//Basket
router.post("/pantry/:pantryId/:basketName",basketController.createBasket)
router.get("/pantry/:pantryId/:basketName",basketController.getBasket)
router.put("/pantry/:pantryId/basket/:basketName",basketController.updateBasket)
router.delete("/pantry/:pantryId/basket/:basketName",basketController.deleteBasket)

module.exports = router;