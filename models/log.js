'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema


const LogSchema = Schema({
  table: String,
  action: String,
  idRow: Number,
  date: {type: Date, default: Date.now()},
  message: String,
  location: { type:Schema.ObjectId, ref: 'Location'}
})

module.exports = mongoose.model('Log',LogSchema)
