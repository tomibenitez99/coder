const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {type: String, require: true},
    description: {type: String, require: true},
    price: {type: Number, require: true},
    thumbnail: {type: String, require: true},
    stock: {type: Number, require: true},
    id: {type: String, require: true},
    time: {type: String, require: true}
})

module.exports = mongoose.model('productos', productSchema);