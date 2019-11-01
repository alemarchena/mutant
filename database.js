const mongoose = require('mongoose');

//determina la ruta de conección
// mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

const URI = 'mongodb://localhost/mutant';
mongoose.connect(URI);


//toma el contro de la base de datos
const db = mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',()=> console.log('Conectado a mutant'));

//publica la conexion a la base de datos
module.exports = mongoose;