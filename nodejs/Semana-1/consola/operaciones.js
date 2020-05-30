function suma(a,b){
    return a + b;
}

function resta(a,b){
    return a - b;
}

//console.log("La suma es: " ,suma(5 ,6));
//console.log("La resta es: " ,resta(9,24));

const Operaciones = {

}

// exports.suma = suma;
// exports.resta = resta;

// module.exports = {
//     suma,
//     resta
// }

// Para exportar atributos funciones etc
module.exports = Operaciones;
Operaciones.suma = suma;
Operaciones.resta = resta;