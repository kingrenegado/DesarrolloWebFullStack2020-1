const express = require('express');
const router = express.Router();
const Product = require('../model/Product'); //poder incluir el crud


router.get('/products/add', (req, res) => {
    res.render('products/addProduct.hbs');
});

router.post('/products/addProduct', async(req, res) => {
    const {nombre,descripcion,cantidad} = req.body;
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
    if(!cantidad){
        errors.push({
            text: 'Por favor Ingresa la cantidad'
        })
    }
    if(errors.length > 0){
        res.render('products/addProduct', {
            errors,
            nombre,
            descripcion,
            cantidad
        },
        console.log(errors))
    }else{
        //METODO CREATE CRUD
        const newProduct = new Product({
            nombre,
            descripcion,
            cantidad
        });
        console.log(newProduct);
        await  newProduct.save();//guardar el modelado en el objeto
        //res.send('OK');

        //DEFINIR MENSAJE DE SALIDA DEL USUARIO
        req.flash('successMessage', 'Producto Agregado satisfactoriamente');

        res.redirect('/products');
    }
});

router.get('/products', async (req, res) => {
   // res.send('Listado de Productos');

   //READ DE DATOS 
   const products = await Product.find().sort({date: 'desc'}).lean();
   res.render('products/listproducts', {products});
   console.log('Productos listados: ' ,products);
});

router.get('/products/edit/:id', async (req,res) => {
    const updateProduct = await Product.findById(req.params.id).lean();
    console.log(updateProduct);
    res.render('products/editProduct', {updateProduct});
});

router.put('/products/editProduct/:id', async (req,res) => {
    const {nombre,descripcion,cantidad} = req.body;
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
    if(!cantidad){
        errors.push({
            text: 'Por favor Ingresa la cantidad'
        })
    }
    if(errors.length > 0){
        res.render('products/editProduct', {
            errors,
            nombre,
            descripcion,
            cantidad
        },
        console.log(errors))
    }else{
    await Product.findByIdAndUpdate(req.params.id , {nombre,descripcion,cantidad});
    req.flash('successMessage', 'Producto Editado satisfactoriamente');
    res.redirect('/products');
    }
}); 

router.get('/products/delete/:id', async(req,res) => {
    await Product.findByIdAndRemove(req.params.id);
    req.flash('successMessage', 'Producto ELiminado satisfactoriamente');
    res.redirect('/products');
})

module.exports = router;