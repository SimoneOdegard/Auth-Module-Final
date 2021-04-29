'use strict';

const mongoose = require('mongoose');

const testSchema = mongoose.Schema ({
  name: { type: String, required: true },
  age: { type: Number, required: true }
})

const testModel = mongoose.model('test', testSchema);

module.exports = testModel;