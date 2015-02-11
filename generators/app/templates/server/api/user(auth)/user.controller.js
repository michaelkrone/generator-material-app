/**
 * Module for the controller definition of the user api.
 * The UserController is handling /api/users requests.
 * @module {user:controller~UserController} user:controller
 * @requires {@link config}
 * @requires {@link ParamController}
 */
'use strict';

var _ = require('lodash');
var jwt = require('jsonwebtoken');
var ParamController = require('../../lib/controllers/param.controller');
var config = require('../../config');

/**
 * The User model instance
 * @type {user:model~User}
 */
var User = require('./user.model').model;

exports = module.exports = UserController;

/**
 * UserController constructor
 * @classdesc Controller that handles /api/users route requests
 * for the user api.
 * Uses the 'id' parameter and the 'user' request property
 * to operate with the [main user API Model]{@link user:model~User} model.
 * @constructor
 * @extends ParamController
 * @see user:model~User
 */
function UserController() {
	ParamController.call(this, User, 'id', 'userObject');
}

UserController.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: UserController,

	/**
	 * Get an array of users from the DB.
	 * @param {http.IncomingMessage} req - The request message object
	 * @param {http.ServerResponse} res - The outgoing response object the result is set to
	 * @returns {http.ServerResponse} Array of all documents for the {user:model~User} model
	 * or the empty Array if no documents have been found. The properties 'salt' and 'hashedPassword'
	 * are omitted.
	 */
	index: function (req, res) {
		this.model.find({}, '-salt -hashedPassword', function (err, users) {
			if (err) {
				return res.handleError(err);
			}
			res.ok(users);
		});
	},

	/**
	 * Creates a new user in the DB from the request body, set provider to 'local' and role to 'user'.
	 * @param {http.IncomingMessage} req - The request message object containing the json document data
	 * @param {http.ServerResponse} res - The outgoing response object
	 * @param {function} next - The next handler function
	 * @returns {http.ServerResponse} The response status 201 CREATED or an error response
	 */
	create: function (req, res, next) {
		var newUser = new User(req.body);

		newUser.provider = 'local';
		newUser.role = 'user';

		newUser.save(function (err, user) {
			if (err) {
				return res.unprocessableEntity(err);
			}
			var token = jwt.sign({_id: user._id}, config.secrets.session, {expiresInMinutes: 60 * 5});
			res.ok({token: token});
		});
	},

	/**
	 * Change the password of a user in the DB. The 'oldPassword' and 'newPassword' property of the
	 * request body are used.
	 * @param {http.IncomingMessage} req - The request message object containing the 'oldPassword' and 'newPassword' property
	 * @param {http.ServerResponse} res - The outgoing response object
	 * @param {function} next - The next handler function
	 * @returns {http.ServerResponse} The response status OK or FORBIDDEN if an error occurs
	 */
	changePassword: function (req, res, next) {
		var userId = req[this.paramName]._id;
		var oldPass = String(req.body.oldPassword);
		var newPass = String(req.body.newPassword);

		this.model.findById(userId, function (err, user) {
			if (user.authenticate(oldPass)) {
				user.password = newPass;
				user.save(function (err) {
					if (err) {
						return res.unprocessableEntity(err);
					}
					res.ok();
				});
			} else {
				res.forbidden();
			}
		});
	},

	/**
	 * Get a single user. The requested user id is read from the request parameters
	 * by using the 'id' property.
	 * @param {http.IncomingMessage} req - The request message object the id is read from
	 * @param {http.ServerResponse} res - The outgoing response object
	 * @param {function} next - The next handler function
	 * @returns {http.ServerResponse} The virtual 'profile' of this user or NOT FOUND if no document has been found
	 */
	show: function (req, res, next) {
		var userId = req.params[this.idName];

		this.model.findById(userId, function (err, user) {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res.unauthorized();
			}
			res.ok(user.profile);
		});
	},

	/**
	 * Get the user for the current request.
	 * The requested user id is read from the user parameter of the request object.
	 * @param {http.IncomingMessage} req - The request message object the user object is read from
	 * @param {http.ServerResponse} res - The outgoing response object
	 * @param {function} next - The next handler function
	 * @returns {http.ServerResponse} The virtual 'profile' of this user or UNAUTHORIZED if no document has been found
	 */
	me: function (req, res, next) {
		var userId = req.user._id;

		User.findOne({_id: userId}, '-salt -hashedPassword',
			function (err, user) { // don't ever give out the password or salt
				if (err) {
					return next(err);
				}
				if (!user) {
					return res.unauthorized();
				}
				res.ok(user);
			});
	},

	/**
	 * Authentication callback function, redirecting to '/'.
	 * @param {http.IncomingMessage} req - The request message object
	 * @param {http.ServerResponse} res - The outgoing response object that is redirected
	 * @param {function} next - The next handler function
	 */
	authCallback: function (req, res, next) {
		res.redirect('/');
	}
};

UserController.prototype = _.create(ParamController.prototype, UserController.prototype);
