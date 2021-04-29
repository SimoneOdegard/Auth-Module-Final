'use strict';

const express = require('express');
const fs = require('fs');
const Collection = require('../models/data-collection.js');

const router = express.Router();

const models = new Map();

router.param('model', (req, res, next) => {
  const modelName = req.params.model;
  if (models.has(modelName)) {
    req.model = models.get(modelName);
    next();
  } else {
    const fileName = `${__dirname}/../models/${modelName}/model.js`;
    if (fs.existsSync(fileName)) {
      const model = require(fileName);
      models.set(modelName, new Collection(model));
      req.model = models.get(modelName);
      next();
    }
    else {
      next('Invalid Model');
    }
  }
});

router.get('/:model', handleGetAll);
router.get('/:model/:id', handleGetOne);
router.post('/:model', handleCreate);
router.put('/:model/:id', handleUpdate);
router.delete('/:model/:id', handleDelete);

async function handleGetAll(req, res) {
  let allItems = await req.model.get();
  res.status(200).json(allItems);
}

async function handleGetOne(req, res) {
  const id = req.params.id;
  let oneItem = await req.model.get(id);
  res.status(200).json(oneItem);
}

async function handleCreate(req, res) {
  let objItem = req.body;
  let newItem = await req.model.create(objItem);
  res.status(200).json(newItem);
}

async function handleUpdate(req, res) {
  let newItem = req.body;
  const id = req.params.id;
  let newObj = await req.model.update(id, newItem);
  res.status(200).json(newObj);
}

async function handleDelete(req, res) {
  const id = req.params.id;
  let deletedItem = await req.model.delete(id);
  res.status(200).json(deletedItem);
}

module.exports = router;