'use strict'

/*
En este controlador se gestionara la informacion de quotation y productQuotation,
se asocian muchos productos a cada quotation
depende de los modelos productos y quotation
*/



const Quotation = require('../models/quotation')
const Location = require('../models/location')


const getAll = ( req, res) => {
  Quotation.find({}, (err,quotes) => {

    if(err) res.status(500).send({message:'Error al realizar peticion '+err})
    if(!quotes) {
      res.status(404).send({message:'No existen cotizaciones'})
      return
    }
    populate(quotes,res)

  })
}

const populate = (quotes,res) => {

  Location.populate(quotes, { path:'location', populate: {path:'user' }},
    (err, quotes) => {
      if(err) res.status(500).send({message:'Error al realizar peticion '+err})
      if(!quotes) {
        res.status(404).send({message:'No se encontraron quotes'})
        return
      }
      res.status(200).send({ quotes })
  })
}

/*
  listar un quotation determinado
*/
const get = (req,res) => {
  let quotationId = req.params.quotationId
  Quotation.findById(quotationId,(err,quotation) => {
    if(err)
      return res.status(500).send({message:'Error al realizar peticion '+err})

    if(!quotation)
      return res.status(404).send({message:'No se encontro el quotation'})

    populate(quotation,res)
  })
}

const save = (req,res) => {
  let quotation = new Quotation()

  quotation.date = req.body.date
  quotation.price = req.body.price
  quotation.maximumStop = req.body.maximumStop
  quotation.location = req.body.location

  quotation.save( (err,quotationStored) => {
    if(err) res.status(500).send({message:'Error al guardar en la base de datos '+err})
    if(!quotationStored) {
      res.status(404).send({ message:'No se encontro el quotation' })
      return
    }
    populate(quotationStored,res)
  })
}

const update = (req,res) => {

  let quotationUpdate = req.body
  let quotationId = req.params.quotationId

  Quotation.findByIdAndUpdate(quotationId, quotationUpdate, (err,quotationStored) => {

      if(err){
         res.status(500).send({ message:'Error al almacenar en la base de datos '+err })
         return
       }

      if(!quotationStored) {
        res.status(404).send({message:'No se encontro el quotation'})

        return
      }
      populate(quotationStored,res)
  })

}

const del = (req,res) => {
    let quotationId = req.params.quotationId

    Quotation.findById(quotationId, (err,quotation) => {
      if(err) res.status(500).send({  message: 'Error al borrar  quotation: '+err})

      if(!quotation) {
        res.status(404).send({  message: 'No se encontro el  quotation '})
        return
      }

      quotation.remove((err) => {
        if(err) res.status(500).send({  message: 'Error al borrar  quotation: '+err})
        res.status(200).send({  message:'El quotation ha sido eliminado'}) })
    })
}





module.exports = {
  getAll,
  get,
  save,
  del,
  update
}
