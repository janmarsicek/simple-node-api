require('dotenv').config();

const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const bodyParser = require("body-parser");

const app = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

MongoClient.connect(process.env.DATABASE, { useNewUrlParser: true }, (err, database) => {
  if (err) return console.log(err);

  // Make sure you add the database name and not the collection name (for MongoDB v3.0+)
  db = database.db(process.env.DB_NAME)
  require('./app/router')(app, db);

  app.listen(port, () => {
    console.log('We are live on ' + port);
  });
});
