const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(express.static((__dirname + '/../client/dist')));

app.get('/api/hiyee', (req, res) => {
  res.send('hiyee');
});

module.exports = app;