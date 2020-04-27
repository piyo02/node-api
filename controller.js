'use strict';

const response = require('./res');
const connection = require('./connection');

exports.index = (req, res) => {
    response.ok("REST API application is running", res);
}