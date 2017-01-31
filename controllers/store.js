'use strict'

const Store = require('../models/store')
const Location = require('../models/location')

const getAll = (req,res) => {
  Store.find({}, (err,stores) => {

    if(err) res.status(500).send({message:'Error al realizar peticion '+err})
    if(!stores) {
      res.status(404).send({message:'No se encontro el store'})
      return
    }
    populate(stores,res)

  })
}

const populate = (store,res) => {

  Location.populate(store, {path: 'location', populate: { path: 'user' } },
    (err, stores) => {
      if(err) res.status(500).send({message:'Error al realizar peticion '+err})
      if(!store) {
        res.status(404).send({message:'No se encontro el store'})
        return
      }
      res.status(200).send({store})
    })

}
const get = (req,res) => {
  let storeId = req.params.storeId
  Store.findById(storeId,(err,store) => {
    if(err) res.status(500).send({message:'Error al realizar peticion '+err})

    if(!store) {
      res.status(404).send({message:'No se encontro el store'})
      return
    }

    populate(store,res)
  })
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

  store.save((err,storeStored) => {
    if(err) res.status(500).send({message:'Error al guardar en la base de datos '+err})
    if(!storeStored) {
      res.status(404).send({message:'No se encontro el store'})
      return
    }
    populate(storeStored,res)
  })
}

const update = (req,res) => {

  let storeUpdate = req.body
  let storeId = req.params.storeId

  Store.findByIdAndUpdate(storeId, storeUpdate, (err,storeStored) => {

      if(err) res.status(500).send({ message:'Error al almacenar en la base de datos '+err })

      if(!storeStored) {
        res.status(404).send({message:'No se encontro el store'})
        return
      }
      populate(storeStored,res)
  })

}

const del = (req,res) => {
    let storeId = req.params.storeId

    Store.findById(storeId, (err,store) =>{
      if(err) res.status(500).send({message: 'Error al borrar  store: '+err})

      if(!store) {
        res.status(404).send({message: 'No se encontro el  store '})
        return
      }

      console.log('store',store)
      store.remove((err) => {
        if(err) res.status(500).send({message: 'Error al borrar  store: '+err})

        res.status(200).send({message:'El store ha sido eliminado'}) })

    })
}

module.exports = {
  getAll,
  get,
  save,
  del,
  update,
}
