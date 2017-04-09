'use strict'

const ProductQuotation = require('../models/productQuotation')
const Product = require('../models/product')
const Quotation = require('../models/quotation')


const all = (req,res) => {

  let quotationId = req.params.quotationId
  console.log(quotationId,'quotationId')
  let promiseModel = ProductQuotation.find({'quotation':quotationId}).exec()
  
  
  populate(promiseModel,res)
  
}

/*
  buscar la relacion de producto quotation y devuelve el detalle de dicha
  cotizacion con su precio y cantidad

*/
const get = (req,res) => {
  //let productQuotationId = req.params.productQuotationId
  let quotationId = req.params.quotationId
  let productId = req.params.productId

 
  let promiseModel = ProductQuotation.find({'quotation':quotationId}).exec()
  populate(promiseModel,res)
}

const save = (req,res) => {
  let productQuotation = new ProductQuotation()

  productQuotation.product = req.body.product
  productQuotation.quotation = req.body.quotation
  productQuotation.quantity = req.body.quantity
  productQuotation.location = req.body.location
  
  let promiseModel = productQuotation.save()
  populate(promiseModel,res)
}

const update = (req,res) => {

  let productQuotationUpdate = req.body
  let quotationId = req.params.quotationId
  let productId = req.params.productId
  
  //let promiseModel = ProductQuotation.findOneAndUpdate({'quotation': quotationId,'product':productId }, productQuotationUpdate)
  let promiseModel = ProductQuotation.findOneAndUpdate({'quotation': quotationId,'product':productId },productQuotationUpdate ).exec()
 
  populate( promiseModel, res )

}

const del = (req,res) => {
     let quotationId = req.params.quotationId
    let productId = req.params.productId

    let promiseModel = ProductQuotation.findOne({'quotation': quotationId,'product':productId }).exec()
    promiseModel.then((productQuotation) => {
      console.log(productQuotation,'productQuotation')
      if(!productQuotation) return res.status(404).send({message: 'No se encontro el  productQuotation '})
      return productQuotation.remove()
    })
    populate(promiseModel,res)
}



const populate = (promiseModel,res) => {

  promiseModel.then((quotes) => {
    console.log(quotes, "params")
    return(Quotation.populate(quotes,
    {
      path: 'quotation',
      populate:{
        path:'location',
        populate:{
          path:'user'
        }
      }
    }))
    .then(Quotation.populate(quotes,{
      path: 'location'      
    }))
    .then((quotes) => {
      
      if(!quotes) return res.status(404).send({message:'No se encontraron quotes'})    
      res.status(200).send({quotes})

    })
    .catch((err) => {
      res.status(500).send({message:'Error al realizar peticion '+err})
    })
  })   
}

module.exports = {
  all,
  get,
  save,
  del,
  update,
}
