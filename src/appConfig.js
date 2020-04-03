/** Dependencies */
const express = require('express');
const morgan = require('morgan')
const bodyParser = require('body-parser')
const app = express();

/** Settings */
app.set('PORT', process.env.PORT || 5000);
app.use(bodyParser.urlencoded({ extended: false }));// parse application/x-www-form-urlencoded
app.use(bodyParser.json());// parse application/json

/** Middlewares */
app.use(morgan('combined'));

/** Routes */
app.use('', require('./routes/indexRouter'));
app.use('/api/v1.0/order', require('./routes/orderRouter'));
app.use('/api/v1.0/customer', require('./routes/customerRouter'));
app.use('/api/v1.0/driver', require('./routes/driverRouter'));

module.exports = app;