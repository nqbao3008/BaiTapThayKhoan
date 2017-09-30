
var mongoose = require('mongoose');
var Schema = mongoose.Schema;



var productSchema = new Schema({
  name: {type: String, default: null},
  decription: {type: String, default: null},
  price: {type: Number, default: null}
});

module.exports = mongoose.model('product', productSchema);