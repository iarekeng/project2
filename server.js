//===============
// DEPENDENCIES
//===============

const express = require("express");
const session = require("express-session");
const methodOverride = require("method-override");
const mongoose = require("mongoose");
const app = express();
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
app.use(methodOverride("_method")); // allows us to delete(DELETE), update(PUT)
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  })
);



//===============
// CONTROLLERS
//===============
const createController = require('./controllers/create_controller.js')
app.use('/products', createController)
const shirtsController = require('./controllers/shirting_controller.js')
app.use('/products', shirtsController)
const userController = require("./controllers/users_controller.js");
app.use("/users", userController);
const sessionsController = require("./controllers/sessions_controller.js");
app.use("/sessions", sessionsController);

//========================
// ROUTES
//========================

app.get("/", (req, res) => {
  res.redirect("/products");
});


//====================
// LISTENER
// ===================

app.listen(PORT, () => {
  console.log("listening on port" + PORT);
});
