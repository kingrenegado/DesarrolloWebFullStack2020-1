var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
 //COOKIE
// router.get('/Login', function(req, res, next) {
//   if(req.cookies.mail){ //Si hay una cookie guardada en mail 
//   console.log(req.cookies);
//     res.render('Login', { mail: req.cookies.mail });//renderiza el valor de cookie
//   }else{
//   res.render('Login');
//   }
// });

// router.post('/Login',function(req,res){
//   res.cookie('mail',req.body.mail, {expires: new Date(Date.now() + (60*60*24))});//especificar tiempo de vida en cookie asi como su estraccion
//   var pagina = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>'
//   + '<p>Se creo la cookie</p>' + '<a href="/">Retornar</a>' + '</body> </html>';
//   res.send(pagina);
// })
//SESSION

router.get('/Login', function(req, res, next) {
  res.render('login');
});

router.post('/Login', function(req,res,next){
  req.session.mail = req.body.mail;
  var pagina = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>'
  + '<p>Se creo la Sesion</p>' + '<a href="/">Retornar</a>' + '</body> </html>';
  res.send(pagina);
});

router.get('/panel',function(req,res){
  if(req.session.mail){
    var pagina = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>'
  + '<h1>Bienvenido</h1>' + req.session.mail + '<a href="/">Retornar</a>' +
  '<a href="/Logout">Logout</a>'
  + '</body> </html>';
  res.send(pagina);
  }else{
    var pagina = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>'
    + '<h1>No tienes derecho a acceder </h1>' + '<a href="/">Retornar</a>' +
    '<a href="/">Retornar</a>'
    + '</body> </html>';
    res.send(pagina);
  }
});

router.get('/Logout',function(req,res,next){
  req.session.destroy();
  var pagina = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Document</title></head><body>'
    + '<h1>Se ha cerrado la sesion </h1>' + '<a href="/">Retornar</a>' +
    '<a href="/">Retornar</a>' + 
    +'<br>'
    + '</body> </html>';
    res.send(pagina);
})



module.exports = router;
