'use strict'

const Product = require('../models/product')
const Store = require('../models/store')

const get =  (req,res) => {
  let productId = req.params.productId

  let promiseModel = Product.findById(productId).exec()
  populate( promiseModel, res )
}

const all = (req,res) => {

  let promiseModel = Product.find({}).exec()
  populate( promiseModel , res )

}

const save = (req,res) => {

  let product = new Product()
  product.barCode = req.body.barCode
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description
  product.store = req.body.store

  let promiseModel =  product.save()
  populate( promiseModel, res )

}

const update = (req, res) => {
  
  let productId = req.params.productId
  let update = req.body
  let promiseModel = Product.findByIdAndUpdate(productId, update).exec()
  populate( promiseModel, res)

}

const del = (req, res) => {
  
  let productId = req.params.productId
  let promiseModel = Product.findById(productId).exec()
  
  promiseModel.then((product) =>{
    if(!product){
      res.status(400).send({messag:'El producto solicitado no existe'})
      return
    }
    return Product.remove()
  })
  
  populate(promiseModel,res)
}

const populate = (promiseModel, res) => {
  
  promiseModel.then((product)=>{
    return Product.populate(product,{path:'store',populate: {path:'location',populate: {path:'user'}}})
  })
  .then((product) =>{
    if(!product) {
      res.status(404).send({message:'No se encontro ningun product'})
      return
    }
    res.status(200).send({product})
  })
  .catch((err) => {
    res.status(500).send({message:'Error al realizar peticion '+err})
  })
}

module.exports = {
  get,
  all,
  update,
  del,
  save
}
