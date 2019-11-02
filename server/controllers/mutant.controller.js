const mutante = require('../models/mutant.model');
const estadistica = require('../models/stats.model');

let respuesta = {
    error: true,
    codigo: 403,
    mensaje: 'dna inválido'
};

exports.isMutant = async function(req, res)
{
    try{
        var esmutante = false;
        mutante.dna = req.body.dna;
        var dnaparaguardar="";

        if (!mutante.dna) {

            res.status(403).send(respuesta);
            return;
        }
        else 
        {
            //------------------------------------ MODELADO DEL JSON  -----------------------------
            let filas = JSON.parse(mutante.dna); //convierto el json en un objeto

            var m = new Array(filas.length); //creo una MATRIZ de altura igual a la cantidad de filas
            var columna;
            var base = ['A', 'T', 'C', 'G'];
            var validadorcolumna=0;

            for (var f = 0; f < filas.length; f++) //recorro las filas
            {
                columna = filas[f].toString(); //guardo el CONTENIDO de la fila como una columna
                var matrizcaracteres = new Array(columna.length); //creo una matriz para guardar los caracteres
                if(f==0)
                    validadorcolumna = columna.length;
                
                //valido que todas los registros del json tengan el mismo tamaño
                if(validadorcolumna != columna.length ) {res.status(403).send(respuesta);return;} //ERROR

                for(var c=0; c < columna.length ;c++)
                {   
                    var caracter = columna.substring(c, c + 1); //encolumno los caracteres
                    dnaparaguardar = dnaparaguardar + caracter; //creo un string con el dna

                    var basevalida=false;
                    for (veri = 0; veri < base.length; veri++) //valido que los caracteres sean de base nitrogenada
                    {
                        if(caracter === base[veri])
                            basevalida=true;

                    }

                    if (!basevalida){ res.status(403).send(respuesta); return; } //ERROR

                    if(caracter )
                    matrizcaracteres[c] = caracter; 
                }
                //guardo en cada fila los caracteres formando una matriz bidimensional
                m[f] = new Array(columna.length); 
                m[f] = columna;
            }

            //------------------------------------ VERIFICACION DE ADN -----------------------------
            var longitudsecuencia = 4;
            var cantidadsecuencias = 0;
            var cl = columna.length;
            var fl =filas.length;
        
            for (var f = 0; f < fl; f++) //verifica secuencia HORIZONTALMENTE --------------------
            {
                var c=0;
                while (c <= (columna.length - longitudsecuencia))
                {
                    if (m[f][c] == m[f][c + 1] && m[f][c] == m[f][c + 2] && m[f][c] == m[f][c + 3])
                    {
                        cantidadsecuencias = cantidadsecuencias + 1;
                        c = cl;
                    }
                    c++;    
                }
                
            }//----------------------------------------------------------------------------------
            
            if(cantidadsecuencias <= 1) //si aun no es mutante
            {
                var c = 0;
                while (c < columna.length)//verifica secuencia VERTICALMENTE ---------------------
                {
                    var f = 0;
                    while (f <= (fl - longitudsecuencia)) 
                    {
                        if (m[f][c] == m[f + 1][c] && m[f][c] == m[f + 2][c] && m[f][c] == m[f + 3][c]) 
                        {
                            cantidadsecuencias = cantidadsecuencias + 1;
                                f = fl;
                        }
                        f++;
                    }

                    if (cantidadsecuencias > 1)
                    {
                        esmutante = true;
                        c = columna.length;
                    }
                    c++;
                }//--------------------------------------------------------------------------------
                
                if (cantidadsecuencias <= 1) //si aun no es mutante
                {
                    var filalimite = fl - longitudsecuencia;
                    for (var f = 0; f <= filalimite; f++)  //verifica en ----DIAGONAL-------------
                    {
                        var c = 0;
                        while (c <= (cl - longitudsecuencia) )  //cuantas columnas verifica
                        {
                            //de izquierda a derecha 
                            if (m[f][c] == m[f + 1][c + 1] && 
                                m[f][c] == m[f + 2][c + 2] && 
                                m[f][c] == m[f + 3][c + 3])
                            {
                                cantidadsecuencias ++;
                            }
                            //de derecha a izquierda
                            if (m[f][cl - (1 - c)] == m[f + 1][cl - 2] && 
                                m[f][cl - (1 - c)] == m[f + 2][cl - 3] && 
                                m[f][cl - (1 - c)] == m[f + 3][cl - 4]) 
                            {
                                cantidadsecuencias ++;
                            }
                            c++;
                        }
                    }//----------------------------------------------------------------
                }
            }
            
            var codigostatus = 0;
            if(cantidadsecuencias <=1) //¿Es mutante o no ?
            {
                esmutante = false;
                codigostatus = 403;
            }else{
                esmutante = true;
                codigostatus = 200;
            }
            
            //verifico si existe el adn
            const esperando = await estadistica.find({dna:dnaparaguardar},'dna', async function(err,muthum){
                if(err)  { return handleError(res, err); } });

            if(esperando.length<=0){
                //guardo el registro en bdd
                const esta = new estadistica();
                esta.esmutante = esmutante;
                esta.dna = dnaparaguardar.trim();

                // console.log("Personaje encontrado:" + muthum);
                await esta.save(function (err) {
                    if (err) { return handleError(res, err); }
                });
            }

            //respondo
            res.status(codigostatus).send(esmutante);
        }
    }catch(e)
    {
        return handleError(res, e);
    }
};


function handleError(res, err) {
    return res.sendStatus(500, err);
}

exports.buscaxdna = async function (req,res)
{
    console.log("Registro buscado WEB:" + req.params.dna.trim());
    const encontrado = await modelostats.find({ dna: req.params.dna.trim()});
    res.json(encontrado);
}