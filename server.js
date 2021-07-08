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

app.get('/api/animals', (req, res) => {
    let results = animals;
    if (req.query) {
      results = filterByQuery(req.query, results);
    }
    res.json(results);
  });

app.get('/api/animals/:id', (req, res) => {
    const result = findById(req.params.id, animals);
    if (result) {
        res.json(result);
      } else {
        res.send(404);
      }
  });

// add animals to catalog
app.post('/api/animals', (req, res) => {
  // set id based on what the next index of the array will be
  req.body.id = animals.length.toString();

  // if any data in req.body is incorrect, send 400 error back
  if (!validateAnimal(req.body)) {
    res.status(400).send('The animal is not properly formatted.');
  } else {
    const animal = createNewAnimal(req.body, animals);
    res.json(animal);
  }
});

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