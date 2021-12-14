const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const PassporLocal = require('passport-local').Strategy;

const app = express();



app.use(express.urlencoded({ extended: true }));

app.use(cookieParser('Este es un secreto'));

app.use(session({
    secret: 'Secreto',
    resave: true, 
    saveUninitilazer: true 
}));

app.use(passport.initialize());

app.use(passport.session());


passport.use(new PassporLocal(function(username, password, done) {
    console.log(username);
    console.log(password);
    if (username === 'Enrique' && password === '1234') {

        return done(null, { id: 'Enrique' });

    } else {
        done(null, false);
    }
}));


passport.serializeUser(function(user, done) {
    done(null, user.id);
})


passport.deserializeUser(function(id, done) {
    done(null, { id: 'Enrique' });
});


app.set('view engine', 'ejs');

app.get("/", function(req, res) {

    res.render("Login");
});

app.get("/Bienvenido", function(req, res) {
    res.render("Bienvenido");
});




app.get("/Login", function(req, res) {

    res.render("Login");
});





app.post("/Login", passport.authenticate('local', {
    successRedirect: "/Bienvenido",
    failureRedirect: "/Login"
}));


app.listen(8090, () => console.log("Server Inicializado"));