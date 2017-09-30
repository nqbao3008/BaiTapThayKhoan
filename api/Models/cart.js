
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var cartSchema = new Schema({
  name: {type: String},
  decription: {type: String},
  price: {type: Number}
});

module.exports = mongoose.model('cart', cartSchema);

