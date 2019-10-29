const controller = {};
const mutante = require('../models/mutant.model');

//creo una estructura para responder
let respuesta = {
    error: false,
    codigo: 200,
    mensaje: ''
};

controller.isMutant = async(req,res) => {

    mutante.dna = req.body.dna;
   

    if (!mutante.dna) {
        respuesta = {
            error: true,
            codigo: 403,
            mensaje: 'El individuo no tiene dna'
        }
        res.status(403).send(respuesta);
    }
    else {
        //creo una matriz de dos dimensiones que va a guardar los caracteres
        var matrizCaracteres = new Array(2);

        //convierto el json que viene del navegador a un objeto
        let objeto = JSON.parse(mutante.dna);
        
        //desarmo el json para armar la matriz de caracteres
        for (var f = 0; f < objeto.length; f++) 
        {
            //creo un objeto por registro del json y lo llamo fila
            let fila = objeto[f];
            
            //desarmo la fila de cada objeto    
            let columna = fila.toString();

            for(var c=0; c < columna.length ;c++)
            {
                var caracter = columna.substring(c, c+1);
                matrizCaracteres[f,c] = caracter;
            }
            console.log(matrizCaracteres);
        }

        respuesta = {
            error: false,
            codigo: 200,
            mensaje: 'Vamos a ver si es humano o mutante'
        }
        res.status(200).send(respuesta);
    }
};

module.exports = controller;