const controller = {};
const mutante = require('../models/mutant.model');
const modelostats = require('../models/stats.model');

let respuesta = {
    error: true,
    codigo: 403,
    mensaje: 'dna inválido'
};

controller.isMutant = async(req,res) => {
    var esmutante = false;
    mutante.dna = req.body.dna;
   
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
            if(validadorcolumna != columna.length )
            {
                res.status(403).send(respuesta);
                return;
            }

            for(var c=0; c < columna.length ;c++)
            {   //encolumno los caracteres
                var caracter = columna.substring(c, c+1);

                var basevalida=false;
                //valido que los caracteres esten dentro de la base nitrogenada
                for(veri=0;veri< base.length;veri++){
                    if(caracter === base[veri]){
                        basevalida=true;
                    }
                }

                if (!basevalida){
                    res.status(403).send(respuesta);
                    return;
                }

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

        //verifica secuencia HORIZONTALMENTE ----------------------------------
        for(var f=0;f< fl ;f++)
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
            
        }//--------------------------------------------------------------------
        
        if(cantidadsecuencias <= 1) //si aun no es mutante
        {
            //verifica secuencia VERTICALMENTE ---------------------
            var c = 0;
            while(c < columna.length)
            {
                var f = 0;
                while (f <= (fl - longitudsecuencia)) 
                {
                    //console.log(m[f][c] + "," + m[f + 1][c] + "," + m[f + 2][c] + "," + m[f + 3][c]);
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
            }//------------------------------------------------------

            
            if (cantidadsecuencias <= 1) //si aun no es mutante
            {
                var filalimite = fl - longitudsecuencia;

                //verifica en ----DIAGONAL-------------
                for (var f = 0; f <= filalimite; f++) 
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
                }//--------------------------------------
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



        //guardo el registro en bdd
        const estadistica = new modelostats();

        estadistica.esmutante = esmutante;
        estadistica.dna = mutante.dna;

        await estadistica.save();

        //respondo
        res.status(codigostatus).send(esmutante);
    }
};

module.exports = controller;