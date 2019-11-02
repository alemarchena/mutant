const mongoose = require('mongoose');

//determino la ruta de conección
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })

//tomo el contro de la base de datos
const db = mongoose.connection;
db.on('error',error => console.error(error));
db.once('open',()=> console.log('Conectado a mutant'));

//publico la conexion a la base de datos
module.exports = mongoose;