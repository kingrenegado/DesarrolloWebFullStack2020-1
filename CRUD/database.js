const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/AplicacionCRUD' , {
    useCreateIndex : true,
    useNewUrlParser : true,
    useFindAndModify : false
}).then(db => console.log('Conexion exitosa')).catch(err => console.log(err));