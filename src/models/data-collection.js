'use strict';

class DataCollection {

  constructor(model) {
    this.model = model;
  }

  get(_id) {
    if (_id) {
      return this.model.findOne({ _id });
    } else {
      return this.model.find({});
    }
  }

  create(item) {
    let newItem = new this.model(item);
    return newItem.save();
  }

  update(_id, item) {
    return this.model.findByIdAndUpdate(_id, item, { new: true });
  }

  delete(_id) {
    return this.model.findByIdAndDelete(_id);
  }

}

module.exports = DataCollection;