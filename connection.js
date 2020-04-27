const mysql = require('mysql');

// connection to db
const conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'node_api'
});

conn.connect( err => {
    if(err) throw err;
    console.log('db connection');
});

module.exports = conn;
