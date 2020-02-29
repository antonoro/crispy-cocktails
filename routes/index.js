var express = require('express');
var router = express.Router();

const mu = require("../db/MongoUtilities.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  
  //update ingredients list with database content
  mu.find()
    .then(ingredients => 
      res.render('index', { title: 'Crispy Cocktails', ingredientsinBar: ingredients})
      );
});

/* GET add Ingredients */
router.post("/ingredients/add", (req, res) => {

  console.log("params", req.query);

  const ingredientAdded = {
    name: req.body.IngredientName,
    quantity: +req.body.IngredientQuantity,
    timestamp: new Date()
  };

  //Add ingredient to database
  mu.insert(ingredientAdded)
    .then(res.redirect("/"));

  //update ingredients list with database content
  mu.find()
    .then(ingredients => 
      res.render('index', { title: 'Crispy Cocktails', ingredientsinBar: ingredients})
      );
});

module.exports = router;
