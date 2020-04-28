const connection = require('../connection');
const mysql = require('mysql');
const md5 = require('md5');
const response = require('../res');
const jwt = require('jsonwebtoken');
const config = require('../config/secret');
const ip = require('ip');

// controller for register
exports.register = (req, res) => {
    const post = {
        name: req.body.name,
        email: req.body.email,
        password: md5(req.body.password),
        role: req.body.role,
        register_date: req.body.register_date
    }

    const checkUniqueEmail = `SELECT email FROM users WHERE email='${post.email}'`;

    connection.query(checkUniqueEmail, (error, rows) => {
        if(error){
            console.log(error);
        } else {
            if(!rows.length){
                const query = `INSERT INTO users (name, email, password, role, register_date) VALUES ("${post.name}", "${post.email}", "${post.password}", ${post.role}, "${post.register_date}")`;
                connection.query(query, (error, rows) => {
                    if(error){
                        console.log(error);
                    } else {
                        response.ok('Register is successfully', res);
                    }
                })
            } else {
                response.ok('Email is already used', res);
            }
        }
    })
}

// controller for login
exports.login = (req, res) => {
    const login = {
        email: req.body.email,
        password: md5(req.body.password),
    }

    const query = `SELECT * FROM users WHERE email='${login.email}' AND password='${login.password}'`;
    connection.query(query, (error, rows) => {
        if(error){
            console.log(error);
        } else {
            if(rows.length){
                const token = jwt.sign({rows}, config.secret, {
                    expiresIn: 1440
                });

                const user_id = rows[0].id;
                const data = {
                    user_id: user_id,
                    token: token,
                    ip_address: ip.address()
                }

                const insertToken = `INSERT INTO token (user_id, token, ip_address) VALUES (${data.user_id}, '${data.token}', '${data.ip_address}')`;
                connection.query(insertToken, (error, rows) => {
                    if(error){
                        console.log(error);
                    } else {
                        res.json({
                            success: true,
                            message: 'Token has generated',
                            token: token,
                            currUser: data.user_id
                        });
                    }
                });
            } else {
                 res.json({
                     "Error": true,
                     "Message": 'Login not success'
                 });
            }
        }
    })
}

// new page with role 2
exports.page = (req, res) => {
    response.ok('This page just for user with role is 2!', res);
}