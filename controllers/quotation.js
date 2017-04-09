'use strict'

/*
En este controlador se gestionara la informacion de quotation y productQuotation,
se asocian muchos productos a cada quotation
depende de los modelos productos y quotation
*/

const Quotation = require('../models/quotation')
const Location = require('../models/location')


const all = ( req, res) => {
  let promiseModel = Quotation.find({}).exec()
  populate(promiseModel,res)
}

/*
  listar un quotation determinado
*/
const get = (req,res) => {
  let quotationId = req.params.quotationId
  let promiseModel = Quotation.findById(quotationId).exec()
  populate(promiseModel,res)
}

const save = (req,res) => {
  let quotation = new Quotation()

  quotation.date = req.body.date
  quotation.price = req.body.price
  quotation.maximumStop = req.body.maximumStop
  quotation.location = req.body.location

  let promiseModel = quotation.save()
  populate(promiseModel,res)

}

const update = (req,res) => {

  let quotationUpdate = req.body
  let quotationId = req.params.quotationId

  let promiseModel = Quotation.findByIdAndUpdate(quotationId, quotationUpdate).exec()
  populate(promiseModel,res)
}

const del = (req,res) => {
    
    let quotationId = req.params.quotationId
    let promiseModel = Quotation.findById(quotationId).exec()
    
    promiseModel.then((quotation) =>{
      if(!quotation) {
        res.status(404).send({  message: 'No se encontro el  quotation '})
        return
      }
      return quotation.remove()
    })
    
    populate(promiseModel,res)
}

const populate = (promiseModel,res) => {

  promiseModel.then((quotes) => {
    return Location.populate(quotes, { path:'location', populate: {path:'user' }})
  })
  .then((quotes) => {
    if(!quotes) {
      res.status(404).send({message:'No se encontraron quotes'})
      return
    }
    res.status(200).send({ quotes })
  })
  .catch((err) => {
    res.status(500).send({message:'Error al realizar peticion '+err})
  })

}

module.exports = {
  all,
  get,
  save,
  del,
  update
}
