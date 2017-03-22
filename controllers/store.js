'use strict'

const Store = require('../models/store')
const Location = require('../models/location')

const all = (req,res) => {

  let promiseModel = Store.find({}).exec()
  populate( promiseModel, res )

}

const get = (req,res) => {

  let storeId = req.params.storeId
  let promiseModel = Store.findById(storeId).exec()
  populate( promiseModel, res )

}

const save = (req,res) => {

  let store = new Store()

  store.name = req.body.name
  store.nit = req.body.nit
  store.description= req.body.description
  store.type = req.body.type
  store.location = req.body.location
  store.address = req.body.address
  store.date = req.body.date
  store.user = req.body.user

  let promiseModel = store.save()
  populate( promiseModel , res )

}

const update = (req,res) => {

  let storeUpdate = req.body
  let storeId = req.params.storeId

  let promiseModel = Store.findByIdAndUpdate(storeId, storeUpdate).exec()
  populate(promiseModel , res)

}

const del = (req,res) => {

  let storeId = req.params.storeId
  let promiseModel = Store.findById(storeId).exec()
  
  promiseModel.then((store) => {
    if(!store) {
      res.status(404).send({message: 'No se encontro el  store '})
      return
    }
    return store.remove()
  })
  
  populate( promiseModel, res )      
  
}

const populate = ( promiseModel , res ) => {

  promiseModel.then((store) => {
    return Location.populate(store, {path: 'location', populate: { path: 'user' } })
  })
  .then((store) =>{
    if(!store) {
      res.status(404).send({message:'No se encontro el store'})
      return
    }
    res.status(200).send({store})
  })
  .catch((err) => {
    if(err) res.status(500).send({message:'Error al realizar peticion '+err})
  })
  
}

module.exports = {
  all,
  get,
  save,
  del,
  update,
}
