const express = require('express');
const parser  = require('body-parser');
const api = require('./api');
const dirProd = 'dist/customManagmnet';

const app = express();
app.use(parser.json());
app.use(express.static(`${__dirname}/${dirProd}`));
app.use('/customers', express.static(`${__dirname}/${dirProd}`));
app.use('/customers/:id', express.static(`${__dirname}/${dirProd}`));
app.use('/customers/:id/edit', express.static(`${__dirname}/${dirProd}`));
app.use('/api', api);

module.exports = app;
