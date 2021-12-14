const express = require('express');
const Users = require('../model/Users');
const router = express.Router();

router.get('/users', (req, res) => {
    res.send('usuarios desde la BD');
});

router.get('/users/signin', (req, res) => {
    res.render('signin.hbs');
});

router.get('/users/signup', (req, res) => {
    res.render('signup.hbs');
});
router.post('/users/signup', (req, res) => {
   let errors = [];
    const {nombreUsuario,email,password,confirmPassword} = req.body;
    console.log(req.body);

    if(password.length <= 0){
        errors.push({text: 'Porfavor Ingresa el password'});
    }
    if(password.length < 6 ){
        errors.push({text: 'Porfavor Ingresa el password mayor a 6 caracteres'});
    }
    if(nombreUsuario.length <= 0){
        errors.push({text: 'Porfavor Ingresa el nombre de usuario'});
    } 
    if(confirmPassword.length <= 0){
        errors.push({text: 'Porfavor Ingresa el password'});
    }
    if(password != confirmPassword){
        errors.push({text: 'Las contraseñas no coinciden'})
    }
    if(errors.length > 0){
        res.render('users/singnup',{error, nombreUsuario,email,password})
    }else{
        console.log("ok");
    }
});
module.exports = router;