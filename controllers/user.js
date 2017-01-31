'use strict'

const User = require('../models/user')

const getAll = (req,res) => {
  User.find({}, (err,users) => {
    if(err) res.status(500).send({message:'Error al realizar peticion '+err})
    res.status(200).send({users})
  })
}

const get = (req,res) => {
  let userId = req.params.userId
  User.findById(userId,(err,user) => {
    if(err) res.status(500).send({message:'Error al realizar peticion '+err})
    res.status(200).send({user})
  })
}

const save = (req,res) => {
  let user = new User()

  user.email = req.body.email
  user.displayName = req.body.displayName
  user.avatar = req.body.avatar
  user.password = req.body.password
  user.signupDate = req.body.signupDate
  user.lastLogin = req.body.lastLogin

  user.save((err,userStored) => {
    if(err)res.status(500).send({message:'Error al guardar en la base de datos '+err})
    res.status(200).send({userStored})
  })
}

const update = (req,res) => {

  let userUpdate = req.body
  let userId = req.params.userId

  User.findByIdAndUpdate(userId, userUpdate, (err,userStored) => {
      if(err) res.status(500).send({ message:'Error al almacenar en la base de datos '+err })
      if(!userStored)
        res.status(404).send({message:'No se encontro el usuario'})
      res.status(200).send({userStored})
  })

}

const del = (req,res) => {
    let userId = req.params.userId

    User.findById(userId, (err,user) =>{
      if(err) res.status(500).send({message: 'Error al borrar  user: '+err})

      if(user){
        user.remove((err) => {
          if(err) res.status(500).send({message: 'Error al borrar  user: '+err})
          res.status(200).send({message:'El user ha sido eliminado'}) })
      }

      res.status(404).send({message: 'No se encontro el  user '})

    })
}

module.exports = {
  getAll,
  get,
  save,
  del,
  update,
}
