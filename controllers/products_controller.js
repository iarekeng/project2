const express = require('express')
const Product = require("../models/products.js");
const Create = require("../models/create.js")
const seed = require("../models/seed.js")
const products = express.Router()

//==============
// SEED File
//==============

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect('/sessions/new')
  }
}

products.get("/seed", (req, res) => {
  Product.create(seed, (err, data) => {
    res.redirect("/products");
  });
});

// DELETE ROUTE //
products.delete("/:id", isAuthenticated, (req, res) => {
  Product.findByIdAndRemove(req.params.id, (error, data) => {
    if (data === null) {
      Create.findByIdAndRemove(req.params.id, (error, data2) => {
        res.redirect("/products/sell");
      });
    } else {
      res.redirect("/products");
    }
  });
});

// INDEX ROUTE //
products.get("/", (req, res) => {
  Product.find({index:"product"}, (err, allProducts) => {
    res.render("index.ejs", {
      products: allProducts,
      currentUser: req.session.currentUser,
    });
  });
});

// SHIRTING ROUTE //
products.get("/shirting", (req, res) => {
  Product.find({category:'shirting'}, (err, allShirting) => {
    res.render("shirting.ejs", {
      shirting: allShirting,
      currentUser: req.session.currentUser
    })
  })
})

// FOOTWEAR ROUTE
products.get("/footwear", (req, res) => {
  Product.find({category: "footwear"}, (err, allFootwear) => {
    res.render("footwear.ejs", {
      footwear:allFootwear,
      currentUser: req.session.currentUser
    })
  })
})

// BOTTOMS ROUTE //
products.get("/bottoms", (req, res) => {
  Product.find({category:'bottoms'}, (err, allBottoms) => {
    res.render('bottoms.ejs', {
      bottoms:allBottoms,
      currentUser: req.session.currentUser
    })
  })
})

// BAG ROUTE //
products.get("/bags", (req, res) => {
  Product.find({category:'bags'}, (err, allBags) => {
    res.render("bags.ejs", {
      bags:allBags,
      currentUser: req.session.currentUser
    })
  })
})

// SELL ROUTE //
products.get("/sell", (req, res) => {
  Create.find({}, (err, foundProduct) => {
    res.render("sell.ejs", {
      products: foundProduct,
      currentUser: req.session.currentUser,
    });
  });
});

// CREATE ROUTE //
products.post("/sell", (req, res) => {
  Create.create(req.body, (err, createdProduct) => {
    res.redirect("/products/sell");
  });
});

// PUT ROUTE //
products.put("/:id", (req, res) => {
  Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    (err, updateProduct) => {
      if (updateProduct === null) {
        Create.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true },
          (err, updateProduct2) => {
            res.redirect("/products/sell");
          }
        );
      } else {
        res.redirect("/products");
      }
    }
  );
});

// EDIT ROUTE //
products.get("/:id/edit", isAuthenticated, (req, res) => {
  Product.findById(req.params.id, (err, editedProduct) => {
    if (editedProduct === null) {
      Create.findById(req.params.id, (err, editedProduct2) => {
        res.render("edit.ejs", {
          products: editedProduct2,
          currentUser: req.session.currentUser,
        });
      });
    } else {
      res.render("edit.ejs", {
        products: editedProduct,
        currentUser: req.session.currentUser,
      });
    }
  });
});

// SHOW ROUTE //
products.get("/:id", (req, res) => {
  Product.findById(req.params.id, (err, foundProduct) => {
    if (foundProduct === null) {
      Create.findById(req.params.id, (err, foundProduct2) => {
        res.render("show.ejs", {
          products: foundProduct2,
          currentUser: req.session.currentUser,
          i: req.params.id,
        });
      });
    } else {
      res.render("show.ejs", {
        products: foundProduct,
        currentUser: req.session.currentUser,
        i: req.params.id,

      });
    }
  });
});


module.exports = products
