const mongoose = require('mongoose');
const { schema } = require('./Product');
const {Schema} = mongoose;

const ServicesSchema = new Schema({
    nombre: {type:String, required:true},
    descripcion : {type:String, required:true},
    precio : {type:Number, required:true},
    date: {type:Date, default: Date.now}
});

module.exports = mongoose.model('Service', ServicesSchema);