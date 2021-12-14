const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../webpack.config'); //modifica la configuración de compilación

var app = express();
app.set('port', (process.env.PORT || 8090 ));
app.use('/static',express.static(__dirname + '../../dist'));
app.use(webpackMiddleware(webpack(webpackConfig)));

//GET Y SET

app.get('/', function(req,res,next){
    res.send('3CT');
})

app.listen(app.get('port'),() => {
    console.log("Servidor levantado");
})