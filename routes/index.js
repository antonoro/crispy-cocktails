var express = require('express');
var router = express.Router();

const mu = require("../db/MongoUtilities.js");

const buildQuery = query => ({
  IngredientName: new RegExp(`.*${query}.*`, "i")
});

/* GET home page. */
router.get('/', function(req, res, next) {
  
  //update ingredients list with database content
  mu.find()
    .then(ingredients => 
      res.render('index', { title: 'Crispy Cocktails', ingredientsinBar: ingredients, nameSearched: "", quantitySearched: ""})
      );
});

/* GET Search ingredients */
router.get("/ingredients/search", (req, res) => {
  const ingName = req.query.IngredientName;

  console.log("Get Search query", req.query);
  console.log("Req name", ingName);

  mu.search(ingName).then(ingredientSearch => {
    
    if(ingredientSearch.length == 0)
    {
      console.log("ingredient empty", ingredientSearch);
      ingredientSearch = [{"IngredientQuantity": "0"}];
      console.log("ingredient modified", ingredientSearch);
    }
    return ingredientSearch;
    }).then(ingredientSearch =>{
      mu.find().then(ingredients => {
        
        console.log("Quantity Searched:", ingredientSearch[0].IngredientQuantity);

        res.render('index', { title: 'Crispy Cocktails', ingredientsinBar: ingredients, nameSearched: ingredientSearch[0].IngredientName, quantitySearched: ingredientSearch[0].IngredientQuantity});
      });
    });
});

/* POST Add Ingredients */
router.post("/ingredients/add", (req, res) => {

  console.log("params", req.query);

  const ingredientAdded = {
    IngredientName: req.body.IngredientName,
    IngredientQuantity: +req.body.IngredientQuantity,
    timestamp: new Date()
  };

  //Add ingredient to database
  mu.insert(ingredientAdded)
    .then(res.redirect("/"));
});

module.exports = router;
