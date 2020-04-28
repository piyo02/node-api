const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const morgan = require('morgan');

// parse application/json
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));


const routers = require('./routers');
routers(app);

app.use('/auth', require('./middleware'));

app.listen(3000, _ => {
    console.log(`Server started on port`);
});