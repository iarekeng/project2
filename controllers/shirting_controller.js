const express = require('express')
const Product = require("../models/products.js");
const Shirt = require('../models/shirting.js')
const shirts = express.Router()

//==============
// SEED File
//==============

shirts.get("/seed", (req, res) => {
  Product.create(shirting, (err, data) => {
    res.redirect("/products");
  });
});

// DELETE ROUTE //
shirts.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, (error, data) => {
      res.redirect("/products");
    });
});
// INDEX ROUTE //
shirts.get("/", (req, res) => {
  Product.find({}, (err, allProducts) => {
    res.render("index.ejs", {
      products: allProducts,
      currentUser: req.session.currentUser,
    });
  });
});

// PUT ROUTE //
shirts.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateProduct) => {
        res.redirect("/products");
      });
    });
// EDIT ROUTE //
shirts.get("/:id/edit", (req, res) => {
  Product.findById(req.params.id, (err, editedProduct) => {
      res.render("edit.ejs", {
        products: editedProduct,
        currentUser: req.session.currentUser,
      });
    });
})
// SHOW ROUTE //
shirts.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
      res.render("show.ejs", {
        products: foundProduct,
        i: req.params.id,
        currentUser: req.session.currentUser,
      });
    });
});

module.exports = shirts
