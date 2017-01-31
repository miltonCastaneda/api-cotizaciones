'use strict'

const Product = require('../models/product')
const Store = require('../models/store')

const getProduct =  (req,res) => {
  let productId = req.params.productId

  Product.findById(productId, (err, product) => {
    if(err) return res.status(500).send({message: 'Error al realizar la peticion '})
    if(!product) return res.status(404).send({message: 'El producto no existe'})

    populate(product, res)

  })
}

const populate = (product, res) => {
  console.log('populate',product)
  //res.status(200).send({product})
  Store.populate(product,{path:'store',populate: {path:'location',populate: {path:'user'}}}, (err, product) => {
    if(err) res.status(500).send({message:'Error al realizar peticion '+err})
    console.log('populate',product)
    if(!product) {
      res.status(404).send({message:'No se encontro ningun product'})
      return
    }
    console.log('sotre',product)
    res.status(200).send({product})
  })
}

const getProducts = (req,res) => {
  Product.find({}, (err,products)=>{
    if(err) return res.status(500).send({message: 'Error al realizar la peticion'+err})
    if(!products) return res.status(404).send({message:'No existen productos'})

    //res.send(200,{products})
    populate(products, res)
  })
}

const saveProduct = (req,res) => {

  let product = new Product()
  product.barCode = req.body.barCode
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description
  product.store = req.body.store

  product.save((err, productStored) => {
    if(err) res.status(500).send({message:'Error al savar la base de datos: '+err})
    res.status(200).send({product: productStored})
  })
}

const updateProduct = (req, res) => {
  let productId = req.params.productId
  let update = req.body
  Product.findByIdAndUpdate(productId, update, (err, productStored) => {
    if(err) res.status(500).send({message: 'Error  al actualizar el producto'+err})
    res.status(200).send({product: productStored})
  })
}

const deleteProduct = (req, res) => {
  let productId = req.params.productId

  Product.findById(productId, (err) =>{
    if(err) res.status(500).send({message: 'Error al borrar el product: '+err})
    Product.remove((err) => {
      if(err) res.status(500).send({message: 'Error al borrar el product: '+err})
      res.status(200).send({message:'El producto ha sido eliminado'})    })
  })
}

module.exports = {
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  saveProduct
}
