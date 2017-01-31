'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ProductQuotationSchema = Schema({
  product: { type: Schema.ObjectId, ref: 'Product' },
  quotation: { type: Schema.ObjectId, ref: 'Quotation' },
  quantity:{ type: Number, default: 0 },
  location:{ type: Schema.ObjectId, ref: 'Location' }
})


module.exports = mongoose.model('ProductQuotation',ProductQuotationSchema)
