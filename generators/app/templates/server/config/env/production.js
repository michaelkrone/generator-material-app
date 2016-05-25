'use strict';

process.env.DATABASE_NAME = process.env.DATABASE_NAME || '<%= appname %>';
process.env.MONGO_URI = process.env.MONGO_URI ||
  ('mongodb://localhost/' + process.env.DATABASE_NAME);

module.exports = {

  ip: process.env.ip || undefined,

  port: process.env.PORT || 8080,

  publicDir: 'client',

  mongo: {
    uri: process.env.MONGO_URI,
    options: process.env.MONGO_OPTIONS && JSON.parse(process.env.MONGO_OPTIONS)
  },

  seedDB: true
};
