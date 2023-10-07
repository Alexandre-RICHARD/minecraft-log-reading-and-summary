const express = require('express');
require('dotenv').config();
const router = require('./router');
const multer = require('multer');

const app = express();
app.use(express.static(__dirname + './../public'));
app.use(multer().none());
app.use(router);

const PORT = process.env.PORT;
const start = () => {
  app.listen(PORT, () => {
    console.log(`Notre serveur fonctionne bien sur le port ${PORT}.`);
  });
};

module.exports = {
  start,
};
