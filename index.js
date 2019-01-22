/**
 * Entrypoint into the api.
 * It configures middleware, binds routes, and starts the web server
 */

const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jwt');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

//for securing the api
app.use(jwt());

// api routes
const User = require('./users/UserRoutes.js');
app.use('/users', User.getRoutes());

// start server
const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 3000;
app.listen(port, function () {
    console.log('Server listening on port ' + port);
});