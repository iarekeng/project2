const mongoose = require('mongoose')

const productsSchema = new mongoose.Schema (
  {
    brand: String,
    name: String,
    category: String,
    index: String,
    img: String,
    price: Number,
    description: {
                  detail1: String,
                  detail2: String,
                  detail3: String,
                  detail4: String,
                  detail5: String,
                 }
  }
)

const Product = mongoose.model('Product', productsSchema)

module.exports = Product
