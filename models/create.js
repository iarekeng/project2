const mongoose = require('mongoose')

const createSchema = new mongoose.Schema (
  {
    brand: String,
    name: String,
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

const Create = mongoose.model('Create', createSchema)

module.exports = Create
