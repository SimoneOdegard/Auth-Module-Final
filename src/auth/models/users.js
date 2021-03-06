'use strict'

const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const users = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true, default: 'user', enum: ['user', 'editor', 'admin'] }
}, { toJSON: {virtuals:true} })

users.virtual('token').get(function () {
  let tokenObj = {
    username: this.username
  }
  return jwt.sign(tokenObj, process.env.SECRET)
})

users.virtual('capabilities').get(function () {
  let acl = {
    user: ['read'],
    editor: ['read', 'update', 'create'],
    admin: ['read', 'update', 'create', 'delete']
  }
  return acl[this.role];
})

users.pre('save', async function() {
  if(this.isModified('password')){
    this.password = await bcrypt.hash(this.password, 5)
  }
})

users.statics.authenticateBasic = async function (username, password){
  const user = await this.findOne({ username });
  const valid = await bcrypt.compare(password, user.password);

  if(valid) { return user; }

  throw new Error('Invalid User');
}

users.statics.authenticateWithToken = async function (token) {

  try{
    const parsedToken = jwt.verify(token, process.env.SECRET)
    const user = this.findOne({username: parsedToken.username })

    if(user) { return user };

    throw new Error('User not found')
  }
  catch(e){
    throw new Error(e.message)
  }
}

module.exports = mongoose.model('users', users);