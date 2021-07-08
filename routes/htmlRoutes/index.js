const path = require('path');
const router = require('express').Router();

// route to front end homepage
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'))
  });
  
  // route to animals page
  router.get('/animals', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/animals.html'));
  });
  
  // route to zookeeper page
  router.get('/zookeepers', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/zookeepers.html'));
  });
  
  // wildcard route
  router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../public/index.html'));
  });
  
  module.exports = router;