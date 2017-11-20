const express = require('express');
const app = express();
const launchReact = require('./launchReact')

app.use('/', launchReact);

app.use('/', function (req,res) {
  res.redirect('/bymonth');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});