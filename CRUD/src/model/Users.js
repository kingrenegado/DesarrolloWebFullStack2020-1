const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const {Schema} = mongoose;
const UserSchema = new Schema({
    nombreUsuario : {type: String, required: true},
    email: {type:String, required: true},
    password : {type:Number, required: true}
});

UserSchema.methods.encryptPassword = async password => {
    const salto = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, this.password)
}

UserSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password)
}
module.exports = mongoose.model('User', UserSchema);