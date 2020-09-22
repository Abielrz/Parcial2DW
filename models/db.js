const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB', {useNewUrlParser: true, useUnifiedTopology: true},(err) =>{
if (!err) { console.log('Conexión a MongoDB Completada')}
else {console.log('Error en la conexión a la base de datos:' + err)}
});

require('./employee.model');