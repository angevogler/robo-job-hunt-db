/************* FILE TO COPY DATA INTO DATABASE *************/

let data = require('./data');

const mongo = require('mongodb').MongoClient;

// connect to test database
mongo.connect('mongodb://localhost:27017/robo-job-hunt', function (err, db) {
  // reference to robots collection
  let robots = db.collection('robots')

  // insert users into database
  // data.users is the array
  for (let i = 0; i < data.users.length; i++) {
    // insert the user into the database
    robots.insert(data.users[i]);
  }

  db.close();
});
