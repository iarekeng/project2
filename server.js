//===============
// DEPENDENCIES
//===============

const express = require("express");
const session = require('express-session')
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
const Product = require("./models/products.js");
const shirting = require("./models/shirting.js");
const Create = require("./models/create.js");
const db = mongoose.connection;
require("dotenv").config();

// PORT
const PORT = process.env.PORT;

// DATABASE
const MONGODB_URI = process.env.MONGODB_URI;

// connect to database
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

//====================
// Error / success
//====================
db.on("error", (err) => console.log(err.message + " is Mongod not running?"));
db.on("connected", () => console.log("mongo connected: ", MONGODB_URI));
db.on("disconnected", () => console.log("mongo disconnected"));

//================
// MIDDLEWARE
//================
app.use(express.static("public"));
// get data from forms as objects - access to key value pairs in req.body, you'll get empty objects if you dont add it
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(methodOverride("_method")); // allows us to delete(DELETE), update(PUT)
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
  })
)

//==============
// SEED File
//==============

app.get("/products/seed", (req, res) => {
  Product.create(shirting, (err, data) => {
    res.redirect("/products");
  });
});

//===============
// CONTROLLERS
//===============
const userController = require('./controllers/users_controller.js')
app.use('/users', userController)
const sessionsController = require('./controllers/sessions_controller.js')
app.use('/sessions', sessionsController)

//========================
// ROUTES
//========================

app.get("/", (req, res) => {
  res.redirect("/products")
})

// DELETE ROUTE //
app.delete("/products/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id, (error, data) => {
    if (data === null) {
      Create.findByIdAndRemove(req.params.id, (error, data2) => {
        res.redirect("/products/sell");
      })
    } else {
      res.redirect("/products");
}
})
})
// INDEX ROUTE //
app.get("/products", (req, res) => {
  Product.find({}, (err, allProducts) => {
    res.render("index.ejs", {
      products: allProducts,
      currentUser: req.session.currentUser
    });
  });
});
// SELL ROUTE //
app.get("/products/sell", (req, res) => {
  Create.find({}, (err, foundProduct) => {
    res.render("sell.ejs", {
      products: foundProduct,
      currentUser: req.session.currentUser
    });
  });
});

// CREATE ROUTE //
app.post("/products/sell", (req, res) => {
  Create.create(req.body, (err, createdProduct) => {
    res.redirect("/products/sell");
  });
});

// PUT ROUTE //
app.put("/products/:id", (req, res) => {
  Product.findByIdAndUpdate(req.params.id, req.body,{ new: true }, (err, updateProduct) => {
      if (updateProduct === null) {
        Create.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, updateProduct2) => {
      res.redirect("/products/sell");
    })
} else {
  res.redirect('/products')
};
})
})
// EDIT ROUTE //
app.get("/products/:id/edit", (req, res) => {
  Product.findById(req.params.id, (err, editedProduct) => {
    if (editedProduct === null) {
      Create.findById(req.params.id, (err, editedProduct2) => {
        res.render("edit.ejs", {
          products: editedProduct2,
          currentUser: req.session.currentUser
        });
      });
    } else {
      res.render("edit.ejs", {
        products: editedProduct,
        currentUser: req.session.currentUser
      });
    }
  });
});

// SHOW ROUTE //
app.get("/products/:id", (req, res) => {
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
        i: req.params.id,
        currentUser: req.session.currentUser
      });
    }
  });
});
//====================
// LISTENER
// ===================

app.listen(PORT, () => {
  console.log("listening on port" + PORT);
});
