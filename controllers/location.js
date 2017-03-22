'use strict'

const Location = require('../models/location')
const User = require('../models/user')

const all = (req,res) => {
  
  let promiseModel = Location.find({}).exec()
  populate( promiseModel, res )
}

const get = (req,res) => {
  let locationId = req.params.locationId
  let promiseModel = Location.findById(locationId).exec()
  populate( promiseModel, res )
}

const save = (req,res) => {

    let location = new Location()

    location.user = req.body.user
    location.latitude = req.body.latitude
    location.longitude = req.body.longitude
    location.ip = req.body.ip

    let promiseModel = location.save()

    populate( promiseModel, res )

}

const update = (req,res) => {

  let locationId = req.params.locationId
  let locationUpdate = req.body

  let promiseModel = Location.findByIdAndUpdate(locationId, locationUpdate).exec()

  populate( promiseModel, res )
}

const del = (req,res) => {
  
  let locationId = req.params.locationId
  let promiseModel = Location.findById(locationId).exec()
  
  promiseModel.then((location) => {
    if(!location) {
      res.status(404).send({message: 'No se encontro el  location '})
      return
    }
    return location.remove()
  })
  
  populate( promiseModel, res )
}


const populate = ( promiseModel, res ) => {
  promiseModel.then((locations) => {
    return (Location.populate( locations,
      {
        path:'user',
        populate:{
          path:'user'
        }
      }))
  })
  .then((locations ) => {
    if(!locations) {
      res.status(404).send({message:'No se encontro el location'})
      return
    }
    res.status(200).send({locations})
  })
  .catch((err) => {
    res.status(500).send({message: 'Error al realizar peticion '+err})
  })
}


module.exports = {
  all,
  get,
  save,
  del,
  update,
}
