'use strict'

const express = require('express')
const api = express.Router()
const ProductCrl = require('../controllers/product')
const UserCrl = require('../controllers/user')
const StoreCrl = require('../controllers/store')
const auth = require('../middlewares/auth')
const QuotationCrl = require('../controllers/quotation')
const ProductQuotationCrl = require('../controllers/productQuotation')
const LocationCrl = require('../controllers/location')

//product

api.get('/product', ProductCrl.all)
api.get('/product/:productId',ProductCrl.get)
api.post('/product',ProductCrl.save)
api.put('/product/:productId', ProductCrl.update)
api.delete('/product/:productId', ProductCrl.del)

//users

api.get('/user', UserCrl.all)
api.get('/user/:userId',UserCrl.get)
api.post('/user',UserCrl.save)
api.put('/user/:userId', UserCrl.update)
api.delete('/user/:userId', UserCrl.del)

//store

api.get('/store', StoreCrl.all)
api.get('/store/:storeId',StoreCrl.get)
api.post('/store',StoreCrl.save)
api.put('/store/:storeId', StoreCrl.update)
api.delete('/store/:storeId', StoreCrl.del)

//quotation
//lista de cotizaciones
api.get('/quotations', QuotationCrl.all)
//lista de cotizaciones
api.get('/quotations/:quotationId',QuotationCrl.get)
//agregar quotations
api.post('/quotations',QuotationCrl.save)

//actualizar quotation
api.put('/quotations/:quotationId', QuotationCrl.update)

//eliminar qoutations
api.delete('/quotations/:quotationId', QuotationCrl.del)

//location

api.get('/locations', LocationCrl.all)
api.get('/locations/:locationId', LocationCrl.get)
api.post('/locations', LocationCrl.save)
api.put('/locations/:locationId', LocationCrl.update)
api.delete('/locations/:locationId', LocationCrl.del)

//productQuotation

//lista de cotizacion dada con su lista de productos
api.get('/quotations/:quotationId/products/',ProductQuotationCrl.all)
//lista el detalle del producto en la cotizacion dada
api.get('/quotations/:quotationId/products/:productId',ProductQuotationCrl.get)
//agregar producto a la quotation
api.post('/quotations/:quotationId/products/',ProductQuotationCrl.save)
//actualizar producto agregado a la cotizacion
api.put('/quotations/:quotationId/products/:productId',ProductQuotationCrl.update)
//eliminar producto asociado a una cotizacion
api.delete('/quotations/:quotationId/products/:productId',ProductQuotationCrl.del)

api.get('/private', auth, function (req, res) {
  res.status(200).send({message: 'Tienes acceso'})
})

module.exports = api
