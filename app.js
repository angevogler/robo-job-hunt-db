/******** APP FILE ********/

// required
const express = require('express');
const mustache = require('mustache-express');
const mongo = require('mongodb').MongoClient;
const bodyparser = require('body-parser');

// configure server
const app = express();

// configure mustache-express & body-parser
app.use(bodyparser.urlencoded({ extended: false }));
app.engine('mustache', mustache());
app.set('views', './views');
app.set('view engine', 'mustache');

// connect to database
mongo.connect('mongodb://localhost:27017/robo-job-hunt', function (err, db) {
  const robots = db.collection('robots');

  // get the robot profiles who do not have jobs
  app.get('/for-hire', function (req, res) {

    // get the robot data from mongo
    // list the data using mustached
    robots.find( { job: null }).toArray().then(function (robots) {
      res.render('profiles', {
        users: robots,
      });
    });
  });

  // get the robot profiles who do have jobs
  app.get('/employed', function (req, res) {
    robots.find( { job: /.+/ }).toArray().then(function (robots) {
      res.render('profiles', {
        users: robots,
      });
    });
  });

  // get the countrys page
  app.get('/country/:id', function (req, res) {
    robots.find( { 'address.country': req.params.id }).toArray().then(function (robots) {
      res.render('profiles', {
        users: robots,
      });
    });
  });

  // get the skills page
  app.get('/skills/:id', function (req, res) {
    robots.find( { skills: req.params.id } ).toArray().then(function (robots) {
      res.render('profiles', {
        users: robots,
      });
    });
  });

  // run Server
  app.listen(4000, function () {
    console.log('welcome to the jungle');
  });
});
