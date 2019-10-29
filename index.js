const express = require('express');
const app = express();

//obtengo la conexion a la base de datos en el inicio
const { mongoose } = require('./database.js');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//lista el puerto al cual esta conectado el servidor
app.set('puerto',process.env.PORT || 3000)
app.listen('3000',() => {
    console.log('Server en puerto : ',app.get('puerto') );
});

// muestra los mensajes del servidor
const morgan = require('morgan');
app.use(morgan('dev'));

//los datos que vienen del navegador son intrepretados por el servidor como json
//app.use(express.json());

//utiliza rutas
const rutas = require('./server/routes/mutant.routes');
app.use('/',rutas);

//const cors = require('cors');
//app.use(cors);