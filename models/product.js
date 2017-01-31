'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = Schema({
  barCode: Number,
  name: String,
  picture: String,
  price: {type: Number, default: 0},
  category: String,
  description: String,
  store: { type: Schema.ObjectId, ref: "Store" }
})

module.exports = mongoose.model('Product', ProductSchema)
