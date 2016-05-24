/**
 * Connect to the database and add connection handlers
 * @module {MongooseConnection} config:mongoose
 * @requires {@link config}
 */
'use strict';

var mongoose = require('mongoose');
var config = require('./index');
var seed = require('./seed');
var env = process.env.NODE_ENV || 'development';

// connect to mongodb
var connection = mongoose.connect(config.mongo.uri, config.mongo.options);

/**
 * The initialized Mongoose connection object
 * @type {MongooseConnection}
 */
module.exports = connection;

// reconnect if connection is disconnected or disconnecting
// throw any errors that occur while reconnecting
if (connection.state === 0 || connection.state === 3) {
  connection.open(function connectionReconnect(err) {
    if (err) {
      console.error('Error while reinitializing the database connection: %s', err);
      throw err; // throw error to stop application launch
    }
    console.log('Database Connection reopened');
  });
}

// register global database error handler
mongoose.connection.on('error', function connectionError(err) {
  console.error('Database Error: ', err);
});

// register the connection handler once only
mongoose.connection.once('open', function connectionOpen() {
  console.log('Database connection open');
  // Populate DB with sample data
  if (config.seedDB) {
    // module.parent === null means current command runs this script directly
    // Represents 'npm run seed'
    if (env !== 'production' || module.parent === null) {
      seed();
    }
  }
});
