/**
 * Module for registering authentication middleware.
 * Registers the local authentication provider by default.
 * @module {express.Router} auth
 * @requires {@link user:model}
 * @requires {@link auth:local}
 * @requires {@link auth:local:passport}
 */
'use strict';

var router = require('express').Router();
var config = require('../../config/');

/**
 * The authentication model: User
 * @type {user:model~User}
 */
var User = require('../../api/user/user.model').model;

// export the configures express router
module.exports = router;

// Passport Configuration
require('./local/passport').setup(User, config);

// apply authentication routes for the providers
router.use('/local', require('./local/index'));

