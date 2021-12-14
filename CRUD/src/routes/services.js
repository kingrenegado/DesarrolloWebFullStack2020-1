const express = require('express');
const router = express.Router();
const Service = require('../model/Services');
const Product = require('../model/Product');

router.get('/services/add', (req, res) => {
    res.render('services/addServices.hbs');
});

router.post('/services/addService', async(req,res) => {
    const {nombre,descripcion,precio} = req.body;
    console.log(req.body);
    const errors = [];
    if(!nombre){
        errors.push({
            text: 'Por favor Ingresa el nombre'
        })
    }
    if(!descripcion){
        errors.push({
            text: 'Por favor Ingresa la descripcion'
        })
    }
    if(!precio){
        errors.push({
            text: 'Por favor Ingresa el precio'
        })
    }
    if(errors.length > 0){
        res.render('services/addService', {
            errors,
            nombre,
            descripcion,
            precio
        },
        console.log(errors))
    }else{
        //METODO CREATE CRUD
        const newService = new Service({
            nombre,
            descripcion,
            precio
        });
        console.log(newService);
        await  newService.save();//guardar el modelado en el objeto
        //res.send('OK');
        req.flash('successMessage', 'Servicio agregado');

        res.redirect('/services');
    }
});

router.get('/services',async (req,res) => {
    const services = await Service.find().lean();
    res.render('services/listservices', {services});
    console.log('Servicios listados: ',services);
});

router.get('/services/editServices/:id', async (req,res)  => {
    const updateService = await Service.findById(req.params.id).lean();
    console.log(updateService);
    res.render('services/editServices', {updateService});
});

router.put('/services/editServices/:id',async (req,res) => {
    const {nombre,descripcion,precio} = req.body;
    const errors = [];
    if(!nombre){
        errors.push({
            text: 'Por favor Ingresa el nombre'
        })
    }
    if(!descripcion){
        errors.push({
            text: 'Por favor Ingresa la descripcion'
        })
    }
    if(!precio){
        errors.push({
            text: 'Por favor Ingresa el precio'
        })
    }
    if(errors.length > 0){
        res.render('services/editServices', {
            errors,
            nombre,
            descripcion,
            precio
        },
        console.log(errors))
    }else{
        await Service.findByIdAndUpdate(req.params.id, {nombre,descripcion,precio});
        req.flash('successMessage', 'Servicio editado satisfactoriamente');
        res.redirect('/services');
    }
});

router.get('/services/deleteServices/:id', async (req,res) => {
    await Service.findByIdAndRemove(req.params.id);
    req.flash('successMessage', 'Servicio eliminado');
    res.redirect('/services');
})

module.exports = router;