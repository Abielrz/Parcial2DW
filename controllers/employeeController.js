const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render("employee/addOrEdit", {
        viewTitle: "Insert Employee"
    });
});

router.post('/', (req, res) => {
    if (req.body._id == '')
        insertRecord(req, res);
        else
        updateRecord(req, res);
});


function insertRecord(req, res) {
    var employee = new Employee();
    employee.DPI = req.body.DPI;
    employee.PrimerNombre = req.body.PrimerNombre;
    employee.SegundoNombre = req.body.SegundoNombre;
    employee.PrimerApellido = req.body.PrimerApellido;
    employee.SegundoApellido = req.body.SegundoApellido;
    employee.ApellidoCasada = req.body.ApellidoCasada;
    employee.FechaNac = req.body.FechaNac;
    employee.PuestoNominal = req.body.PuestoNominal;
    employee.PuestoFuncional = req.body.PuestoFuncional;
    employee.Departamento = req.body.Departamento;
    employee.EmailInst = req.body.EmailInst;
    employee.EmailPer = req.body.EmailPer;
    employee.TelCasa = req.body.TelCasa;
    employee.TelCel = req.body.TelCel;
    employee.save((err, doc) => {
        if (!err)
            res.redirect('employee/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else
                console.log('Error during record update : ' + err);
        }
    });
}

router.get('/list', (req, res) => {
    Employee.find((err, docs) => {
        if (!err) {
            res.render("employee/list", {
                list: docs
            });
        }
        else {
            console.log('Error in retrieving employee list :' + err);
        }
    });
});

function handleValidationError(err, body) {
    for (field in err.errors) {
        switch (err.errors[field].path) {
            case 'DPI':
                body['DPI'] = err.errors[field].message;
                break;
            case 'EmailInst':
                body['EmailInst'] = err.errors[field].message;
                break;
            case 'PrimerNombre':
                body['PrimerNombre'] = err.errors[field].message;
                break;    
            case 'PrimerApellido':
                body['PrimerApellido'] = err.errors[field].message;
                break;
            case 'EmailPer':
                body['EmailPer'] = err.errors[field].message;
                break;
            case 'TelCasa':
                body['TelCasa'] = err.errors[field].message;
                break;
            case 'TelCel':
                body['TelCel'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee/addOrEdit", {
                viewTitle: "Actualizar Empleado",
                employee: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee/list');
        }
        else { console.log('Error in employee delete :' + err); }
    });
});

module.exports = router;