const mongoose = require('mongoose');
const {Schema} = mongoose;

const ProductSchema = new Schema({
    nombre : {type: String, required: true},
    descripcion: {type:String, required: true},
    cantidad : {type:Number, required: true},
    date : {type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', ProductSchema);