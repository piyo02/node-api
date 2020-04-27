'use strict';

const response = require('./res');
const connection = require('./connection');

// variable for query
let query = "";

exports.index = (req, res) => {
    response.ok("REST API application is running", res);
}

// get all students
exports.getAllStudents = (req, res) => {
    query = 'SELECT * FROM mahasiswa';
    connection.query( query, (err, rows, fields) => {
        if(err){
            console.log(err);
        } else {
            response.ok(rows, res);
        }
    });
}

// get student by id
exports.getStudentById = (req, res) => {
    const id = req.params.id;
    query = `SELECT * FROM mahasiswa WHERE id = ${id}`;
    connection.query(query, (err, rows, fields) => {
        if(err){
            console.log(err);
        } else {
            response.ok(rows, res);
        }
    });
}

// create new student
exports.createStudent = (req, res) => {
    const nim = req.body.nim;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;

    query = `INSERT INTO mahasiswa (nim, nama, jurusan) VALUES (${nim}, '${nama}', '${jurusan}')`;
    connection.query(query, (err, rows, fields) => {
        if(err){
            console.log(err);
        } else {
            response.ok('Successfully create new data!', res);
        }
    });
}

// edit student
exports.editStudent = (req, res) => {
    const id = req.params.id;

    const nim = req.body.nim;
    const nama = req.body.nama;
    const jurusan = req.body.jurusan;

    query = `UPDATE mahasiswa SET nim = ${nim}, nama = '${nama}', jurusan = '${jurusan}' WHERE id = ${id}`;
    connection.query(query, (err, rows, fields) => {
        if(err){
            console.log(err);
        } else {
            response.ok('Successfully update data!', res);
        }
    });
}

// delete student by id
exports.deleteStudent = (req, res) => {
    const id = req.body.id;
    
    query = `DELETE FROM mahasiswa WHERE id = ${id}`;
    connection.query(query, (err, rows, fields) => {
        if(err){
            console.log(err);
        } else {
            response.ok('Successfully delete data', res);
        }
    });
}
