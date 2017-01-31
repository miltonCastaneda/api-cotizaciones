'use strict'

const ProductQuotation = require('../models/productQuotation')
const Product = require('../models/product')
const Quotation = require('../models/quotation')


const getAll = (req,res) => {

  let quotationId = req.params.quotationId

  ProductQuotation.find({'quotation':quotationId }, (err,quotes) => {
    console.log('quotation',quotes)

    if(err) res.status(500).send({message:'Error al realizar peticion '+err})
    if(!quotes) {
      res.status(404).send({message:'No existen cotizaciones'})
      return
    }
    populate(quotes,res)
  })
}

const populate = (productQuotation,res) => {

  Quotation.populate(productQuotation,
    {
      path: 'quotation',
      populate:{
        path:'location',
        populate:{
          path:'user'
        }
      }
    },
    (err, quotes) => {

      if(err) res.status(500).send({message:'Error al realizar peticion '+err})

      if(!quotes) {
        res.status(404).send({message:'No se encontraron quotes'})
        return
      }

      res.status(200).send({quotes})
  })
}
/*
  buscar la relacion de producto quotation y devuelve el detalle de dicha
  cotizacion con su precio y cantidad

*/
const get = (req,res) => {
  //let productQuotationId = req.params.productQuotationId
  let quotationId = req.params.quotationId
  let productId = req.params.productId

  ProductQuotation.find({'quotation':quotationId},(err,productQuotation) => {
    if(err) res.status(500).send({message:'Error al realizar peticion '+err})

    if(!productQuotation) {
      res.status(404).send({message:'No se encontro el productQuotation'})
      return
    }

    populate(productQuotation,res)
  })
}

const save = (req,res) => {
  let productQuotation = new ProductQuotation()

  productQuotation.product = req.body.product
  productQuotation.quotation = req.body.quotation
  productQuotation.quantity = req.body.quantity
  productQuotation.location = req.body.location

  productQuotation.save( (err,productQuotationStored) => {
    if(err) res.status(500).send({message:'Error al guardar en la base de datos '+err})
    if(!productQuotationStored) {
      res.status(404).send({ message:'No se encontro el productQuotation' })
      return
    }
    populate(productQuotationStored,res)
  })
}

const update = (req,res) => {

  // let productQuotationUpdate = req.body
  // let quotationId = req.params.QuotationId
  // let productId = req.params.productId
  //
  // ProductQuotation.find(productQuotationId, productQuotationUpdate, (err,productQuotationStored) => {
  //
  //     if(err){
  //        res.status(500).send({ message:'Error al almacenar en la base de datos '+err })
  //        return
  //      }
  //
  //     if(!productQuotationStored) {
  //       res.status(404).send({message:'No se encontro el productQuotation'})
  //
  //       return
  //     }
  //     populate(productQuotationStored,res)
  // })

}

const del = (req,res) => {
    let productQuotationId = req.params.productQuotationId

    ProductQuotation.findById(productQuotationId, (err,productQuotation) =>{
      if(err) res.status(500).send({message: 'Error al borrar  productQuotation: '+err})

      if(!productQuotation) {
        res.status(404).send({message: 'No se encontro el  productQuotation '})
        return
      }

      productQuotation.remove((err) => {
        if(err) res.status(500).send({message: 'Error al borrar  productQuotation: '+err})
        res.status(200).send({message:'El productQuotation ha sido eliminado'}) })
    })
}

module.exports = {
  getAll,
  get,
  save,
  del,
  update,
}
