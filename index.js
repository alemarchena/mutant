require('dotenv').config();

//valida la variable del servidor en produccion
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').parse('DATABASE_URL');
}
console.log(process.env.NODE_ENV);
//obtengo la conexion a la base de datos en el inicio
const { mongoose } = require('./database.js');

const express = require('express');
const app = express();


//los datos que vienen del navegador son intrepretados por el servidor como json
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


//lista el puerto al cual esta conectado el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT,() => {
    console.log('Server en puerto : ',app.get(PORT) );
});

// muestra los mensajes del servidor
const morgan = require('morgan');
app.use(morgan('dev'));

//utiliza rutas
const rutas = require('./server/routes/mutant.routes');
app.use('/',rutas);

const srutas = require('./server/routes/stats.routes');
app.use('/', srutas);

const cors = require('cors');
app.use(cors);

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
