const express = require('express');
const axios = require('axios');
const path = require('path');
const bodyParser = require('body-parser');
const credentials = require('./credentials.js');
const client = require('twilio')(credentials.accountSid, credentials.authToken);
const apiKey = require('./apikey.js');


const app = express();

app.use(bodyParser.json());
app.use(express.static((__dirname + '/../client/dist')));

//pulls latest available data and passes it along to the App component
app.get('/api/games', (req, res) => {
  axios.get(`https://api.the-odds-api.com/v3/odds/?sport=americanfootball_nfl&region=us&mkt=spreads&apiKey=${apiKey}&dateFormat=iso`)
  .then((picks) => {
    res.send(picks.data);
  })
  .catch((err) => {
    console.log(err);
  });
});

//sends user's selected picks and any custom message to the commissioner
app.post('/api/picks', (req, res) => {
  let textBody = `Text from ${req.body.picker}:
  Week ${req.body.week} Picks: ${req.body.picks.toString()}
  Custom Message: ${req.body.custom_message}`;
  client.messages
  .create({
     body: textBody,
     from: '+12067371897',
     to: '+12674468696'
   })
  .then(message => console.log(message.sid))
  .then(res.send("Your commish has been notified of your picks!"))
  .catch(err => console.log(err));
})



module.exports = app;