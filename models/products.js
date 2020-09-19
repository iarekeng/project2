const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema (
  {
    brand: String,
    name: String,
    img: String,
    price: Number,
  }
)

const Product = mongoose.model('Product', productsSchema)

module.exports = Product
