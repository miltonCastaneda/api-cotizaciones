'use strict'

const User = require('../models/user')

const all = (req,res) => {
  let promiseModel = User.find({}).exec()
  populate(promiseModel,res)
}

const populate = (promiseModel, res) => {

  promiseModel.then((users) => {
    if(!users) return res.status(400).send({message: 'El usuario ingresado no existe'})
    res.status(200).send({users})
  })
  .catch((err) => {
    res.status(500).send({message:'Error al realizar peticion '+err})
  })
  
}

const get = (req,res) => {
  
  let userId = req.params.userId
  let promiseModel = User.findById(userId).exec()

  populate(promiseModel,res)

}

const save = (req,res) => {
  
  let user = new User()

  user.email = req.body.email
  user.displayName = req.body.displayName
  user.avatar = req.body.avatar
  user.password = req.body.password
  user.signupDate = req.body.signupDate
  user.lastLogin = req.body.lastLogin

  let promiseModel = user.save()
  populate(promiseModel,res)

}

const update = (req,res) => {

  let userUpdate = req.body
  let userId = req.params.userId

  let promiseModel = User.findByIdAndUpdate(userId, userUpdate).exec()

  populate(promiseModel,res)
}

const del = (req,res) => {
    
    let userId = req.params.userId
    let promiseModel = User.findById(userId).exec()
    
    promiseModel.then((user) => {
      if(!user) return res.status(404).send({message: 'No se encontro el  user '})
      return user.remove()
    })
    
    populate(promiseModel, res)   
}

module.exports = {
  all,
  get,
  save,
  del,
  update,
}
