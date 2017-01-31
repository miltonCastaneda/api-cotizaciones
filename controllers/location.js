'use strict'

const Location = require('../models/location')
const User = require('../models/user')

const getAll = (req,res) => {
  Location.find({}, (err,locations) => {

    if(err) res.status(500).send({message:'Error al realizar peticion '+err})
    if(!locations) {
      res.status(404).send({message:'No se encontro el location'})
      return
    }
    populate(locations,res)
  })
}

const populate = (location,res) => {

  User.populate(location, {path: 'user'},
    (err, locations) => {

      if(err) res.status(500).send({message:'Error al realizar peticion '+err})
      if(!locations) {
        res.status(404).send({message:'No se encontro el location'})
        return
      }
      res.status(200).send({locations})
    })
}

const get = (req,res) => {
  let locationId = req.params.locationId
  Location.findById(locationId,(err,location) => {
    if(err) res.status(500).send({message:'Error al realizar peticion '+err})

    if(!location) {
      res.status(404).send({message:'No se encontro el location'})
      return
    }

    populate(location,res)

  })
}

const save = (req,res) => {

    let location = new Location()

    location.user = req.body.user
    location.latitude = req.body.latitude
    location.longitude = req.body.longitude
    location.ip = req.body.ip

    location.save((err,locationStored) => {
      if(err) res.status(500).send({message:'Error al guardar en la base de datos '+err})
      if(!locationStored) {
        res.status(404).send({message:'No se encontro el location'})
        return
      }

      populate(locationStored,res)
    })

}

const update = (req,res) => {

  let locationId = req.params.locationId
  let locationUpdate = req.body

  Location.findByIdAndUpdate(locationId, locationUpdate, (err,locationStored) => {
    if (err) res.status(500).send({ message:'Error al almacenar en la base de datos '+err })

    if(!locationStored) {
      res.status(404).send({message:'No se encontro el location'})
      return
    }
    populate(locationStored,res)
  })
}

const del = (req,res) => {
    let locationId = req.params.locationId

    Location.findById(locationId, (err,location) =>{
      if(err) res.status(500).send({message: 'Error al borrar  location: '+err})

      if(!location) {
        res.status(404).send({message: 'No se encontro el  location '})
        return
      }

      location.remove((err) => {
        if(err) res.status(500).send({message: 'Error al borrar  location: '+err})

        res.status(200).send({message:'El location ha sido eliminado'})
       })

    })
}

module.exports = {
  getAll,
  get,
  save,
  del,
  update,
}
