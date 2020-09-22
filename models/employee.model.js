const mongoose = require('mongoose');

var employeeSchema = new mongoose.Schema({
    DPI:{
        type: String
    },
    PrimerNombre:{
        type: String
    },
    SegundoNombre:{
        type: String
    },
    PrimerApellido:{
        type: String
    },
    SegundoApellido:{
        type: String
    },
    ApellidoCasada:{
        type: String
    },
    FechaNac:{
        type: String
    },
    PuestoNominal:{
        type: String
    },
    PuestoFuncional:{
        type: String
    },
    Departamento:{
        type: String
    },
    EmailInst:{
        type: String
    },
    EmailPer:{
        type: String
    },
    TelCasa:{
        type: String
    },
    TelCel:{
        type: String
    }
});
var employee2Schema = new mongoose.Schema({
    DPI:{
        type: String
    },
    Nombre:{
        type: String
    },
    Puesto:{
        type: String
    },
    Lugar:{
        type: String
    },
    FechaIngreso:{
        type: String
    },
    Telefono:{
        type: String
    }
});

mongoose.model('Employee',employeeSchema);
mongoose.model('Employee2',employee2Schema);