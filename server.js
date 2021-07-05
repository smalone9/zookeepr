// initiating express server
const express = require('express');
const app = express();
// route to request data
const { animals } = require('./data/animals.json');
app.get('/api/animals', (req, res) => {
    res.send('Hello!');
  });
// chain listen method
app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
  });