const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

//Inicializaciones  (1)
const app = express();

require('./database');




//Settings (Configuraciones) (2) 
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'src/views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

//Middleware (Antes de llegar al servidor)

app.use(express.urlencoded({
    extended: false
}));
app.use(methodOverride('_method')); // Formularios methodos put y delete


app.use(session({
    secret: 'Loquesea',
    resave: true,
    saveUninitialized: true
}));

app.use(flash());
app.use((req,res,next) => {
    res.locals.successMessage = req.flash('successMessage');
    res.locals.errorMessage = req.flash('errorMesagge');
    next()
});

// Routes 

app.use(require('./src/routes/index'));
app.use(require('./src/routes/usuarios'));
app.use(require('./src/routes/products'));
app.use(require('./src/routes/services'));

//Static Files

app.use(express.static(path.join(__dirname, 'public')));



//Server is listenning (3)
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
});