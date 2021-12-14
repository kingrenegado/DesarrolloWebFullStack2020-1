const express = require('express');

var app = express();
app.set('port', (process.env.PORT || 8090 ));

//GET Y SET

app.listen(app.get('port'),() => {
    console.log("Servidor levantado");
})