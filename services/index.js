'use strict'

//

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')


function createToken( user ){
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment().add(14,'days').unix(),
  }


  return jwt.encoded(payload, config.SECRET_TOCKEN)
}


module.exports = createToken
