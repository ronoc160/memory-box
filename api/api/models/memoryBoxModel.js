
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CollectionSchema = new Schema({
  name: {
    type: String,
    required: 'Kindly enter the name of the task'
  },
  message: {
    type: String,
    required: 'enter the messgae pal'
  },
  productImage: {
    type: String,
    required: true
  },
  Created_date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: [{
      type: String,
      enum: ['pending', 'ongoing', 'completed']
    }],
    default: ['pending']
  }
});

module.exports = mongoose.model('Collections', CollectionSchema);
