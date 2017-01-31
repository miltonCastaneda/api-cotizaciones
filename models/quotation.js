'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const QuotationSchema = Schema({
  date:  { type: Date, default: Date.now() },
  // store: { type: Schema.ObjectId, ref: "Store" } ,
  price: { type: Number, default:0 },
  maximumStop:{ type: Number, default:0 },
  location: { type: Schema.ObjectId, ref: 'Location'}
})

//guardar location antes de guardar
//Schema.model.pre('save',())

module.exports = mongoose.model('Quotation',QuotationSchema)
