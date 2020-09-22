const express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee2');

router.get('/', (req, res) => {
    res.render("employee2/addOrEdit", {
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
    var employee2 = new Employee();
    employee2.DPI = req.body.DPI;
    employee2.Nombre = req.body.Nombre;
    employee2.Puesto = req.body.Puesto;
    employee2.Lugar = req.body.Lugar;
    employee2.FechaIngreso = req.body.FechaIngreso;
    employee2.Telefono = req.body.Telefono;

    employee2.save((err, doc) => {
        if (!err)
            res.redirect('employee2/list');
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee2/addOrEdit", {
                    viewTitle: "Insert Employee",
                    employee2: req.body
                });
            }
            else
                console.log('Error during record insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    Employee.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
        if (!err) { res.redirect('employee2/list'); }
        else {
            if (err.name == 'ValidationError') {
                handleValidationError(err, req.body);
                res.render("employee2/addOrEdit", {
                    viewTitle: 'Update Employee',
                    employee2: req.body
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
            res.render("employee2/list", {
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
            case 'Nombre':
                body['Nombre'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

router.get('/:id', (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render("employee2/addOrEdit", {
                viewTitle: "Actualizar Empleado",
                employee2: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/employee2/list');
        }
        else { console.log('Error in employee delete :' + err);
        res.json({message: 'Producto Eliminado'});    
    }
    });
});

module.exports = router;