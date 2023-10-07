const express = require('express');
const Router = new express.Router();

const listController = require('./controllers/listController');

Router.get('/init', listController.initiate);
Router.get('/getFTP', listController.getFTPData);

module.exports = Router;
