'use strict';

const response = require('./res');
const connection = require('./connection');

exports.index = (req, res) => {
    response.ok("REST API application is running", res);
}

// menampilkan semua data mahasiswa
exports.getAllStudents = (req, res) => {
    connection.query('SELECT * FROM mahasiswa', (err, rows, fields) => {
        if(err){
            connection.log(err);
        } else {
            response.ok(rows, res);
        }
    });
}

// get student by id
exports.getStudentById = (req, res) => {
    let id = req.params.id;
    connection.query(`SELECT * FROM mahasiswa WHERE id = ${id}`, (err, rows, fields) => {
        if(err){
            connection.log(err);
        } else {
            response.ok(rows, res);
        }
    });
}