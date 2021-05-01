'use strict'

const express = require('express');
const authRouter = express.Router()

const User = require('./models/users.js')
const basic = require('./middleware/basic.js')
const bearer = require('./middleware/bearer.js')
const acl = require('./middleware/acl.js')


authRouter.post('/signup', async (req, res, next) => {

  try {
    const user = new User(req.body)
    const userRecord = await user.save()
    const output = { user: userRecord, token: userRecord.token }
    res.status(201).json(output)
  }
  catch(e){
    next(e.message)
  }
})

authRouter.post('/signin', basic, (req, res, next) => {

  const user = { user: req.user, token: req.user.token }
  res.status(200).json(user)

})

authRouter.get('/users', bearer, acl('read'), async (req, res, next) => {

  const users = await User.find({})
  const list = users.map(user => user.username)
  res.status(200).json(list)

})

authRouter.get('/secret', bearer, async(req, res, next) => {

  res.status(200).send('Secret route')
  
})

module.exports = authRouter;