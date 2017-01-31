'use strict'


const mongoose = require('mongoose')
const Schema = mongoose.Schema


const StoreSchema = Schema({
  name: String,
  nit: String,
  description: String,
  type: String,
  location: { type: Schema.ObjectId, ref:'Location'},
  address: String,
  date:{type:Date, default: Date.now()},
})

module.exports = mongoose.model('Store',StoreSchema)
