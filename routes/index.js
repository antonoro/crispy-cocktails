var express = require('express');
var router = express.Router();

const mu = require("../db/MongoUtilities.js");

/* GET home page. */
router.get('/', function(req, res, next) {
  
  mu.find()
    .then(ingredients => 
      res.render('index', { title: 'Crispy Cocktails', ingredientsinBar: ingredients})
      );
});

module.exports = router;
