const express = require('express')
const Create = require('../models/create.js')
const create = express.Router()

// DELETE ROUTE //
create.delete("/:id", (req, res) => {
      Create.findByIdAndRemove(req.params.id, (error, data2) => {
        res.redirect("/products/sell");
      });
    });


// SELL ROUTE //
create.get("/sell", (req, res) => {
  Create.find({}, (err, foundProduct) => {
    res.render("sell.ejs", {
      products: foundProduct,
      currentUser: req.session.currentUser,
    });
  });
});

// CREATE ROUTE //
create.post("/sell", (req, res) => {
  Create.create(req.body, (err, createdProduct) => {
    res.redirect("/products/sell");
  });
});

// PUT ROUTE //
create.put("/:id", (req, res) => {
        Create.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true },
          (err, updateProduct2) => {
            res.redirect("/products/sell");
          }
        );
      });

// EDIT ROUTE //
create.get("/:id/edit", (req, res) => {
      Create.findById(req.params.id, (err, editedProduct2) => {
        res.render("edit.ejs", {
          products: editedProduct2,
          currentUser: req.session.currentUser,
        });
      });
      });




// SHOW ROUTE //
create.get("/:id", (req, res) => {
      Create.findById(req.params.id, (err, foundProduct2) => {
        res.render("show.ejs", {
          products: foundProduct2,
          currentUser: req.session.currentUser,
          i: req.params.id,
        });
    });
  });

module.exports = create
