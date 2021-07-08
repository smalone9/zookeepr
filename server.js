const fs = require('fs');
const path = require('path');
// initiating express server
const express = require('express');
const { animals } = require('./data/animals.json');

const PORT = process.env.PORT || 3001;
const app = express();

// parse incoming front end files
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

// route to front end homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
});

// route to animals page
app.get('/animals', (req, res) => {
  res.sendFile(path.join(__dirname, './public/animals.html'));
});

// route to zookeeper page
app.get('/zookeepers', (req, res) => {
  res.sendFile(path.join(__dirname, './public/zookeepers.html'));
});

// wildcard route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'));
});

// chain listen method
app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});