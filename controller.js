'use strict';

const response = require('./res');
const connection = require('./connection');

// function result
const result = (err, rows, fields, res) => {
    if(err){
        connection.log(err);
    } else {
        response.ok(rows, res);
    }
}
// variable for query
let query = "";

exports.index = (req, res) => {
    response.ok("REST API application is running", res);
}

// get all students
exports.getAllStudents = (req, res) => {
    query = 'SELECT * FROM mahasiswa';
    connection.query( query, result(err, rows, fields, res) );
}

// get student by id
exports.getStudentById = (req, res) => {
    let id = req.params.id;
    query = `SELECT * FROM mahasiswa WHERE id = ${id}`;
    connection.query(query, result(err, rows, fields, res));
}