'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const LocationSchema = Schema({
  user:{ type:Schema.ObjectId, ref: 'User'},
  latitude: {type: Number, default: 0},
  longitude: {type: Number, default: 0},
  ip: String,
  date:{type:Date, default: Date.now()}
})

module.exports = mongoose.model('Location',LocationSchema)
