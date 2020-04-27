'use strict';

module.exports = (app) => {
    const myjson = require('./controller');

    app.route('/')
        .get(myjson.index);
}