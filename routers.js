'use strict';

module.exports = (app) => {
    const myjson = require('./controller');

    app.route('/')
        .get(myjson.index);

    app.route('/students')
        .get(myjson.getAllStudents);

    app.route('/student/:id')
        .get(myjson.getStudentById);
    
    app.route('/add')
        .post(myjson.createStudent);

    app.route('/edit/:id')
        .put(myjson.editStudent);

    app.route('/delete')
        .delete(myjson.deleteStudent);
}