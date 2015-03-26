/**
 * Module for the controller definition of the user api.
 * The UserController is handling /api/users requests.
 * @module {user:controller~UserController} user:controller
 * @requires {@link module:config}
 * @requires {@link ParamController}
 */
'use strict';

var _ = require('lodash');
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
 * @inherits ParamController
 * @see user:model~User
 */
function UserController(router) {
	ParamController.call(this, User, 'id', 'userDocument', router);
	this.select = ['-salt', '-hashedPassword'];
	this.omit = ['salt', 'hashedPassword'];
	this.defaultReturn = 'profile';
}

UserController.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: UserController,

	/**README
	 * Replaces an existing user password in the DB using the request body
	 * property named 'password'. Should be an admin only route.
	 * @param {IncomingMessage} req - The request message object
	 * @param {ServerResponse} res - The outgoing response object
	 * @returns {ServerResponse} The updated document or NOT FOUND if no document has been found
	 */
	setPassword: function (req, res) {
		// check for a user id
		if (!req[this.paramName]._id) {
			return res.badRequest();
		}

		req[this.paramName].password = req.body.password;
		delete req.body.password;

		req[this.paramName].save(function (err) {
			if (err) {
				return res.handleError(err);
			}
			return res.noContent();
		});
	},

	/**
	 * Change the password of a user in the DB. The 'oldPassword' and 'newPassword' property of the
	 * request body are used.
	 * @param {IncomingMessage} req - The request message object containing the 'oldPassword' and 'newPassword' property
	 * @param {ServerResponse} res - The outgoing response object
	 * @param {function} next - The next handler function
	 * @returns {ServerResponse} The response status OK or FORBIDDEN if an error occurs
	 */
	changePassword: function (req, res, next) {
		var userId = req[this.paramName]._id;
		var oldPass = String(req.body.oldPassword);
		var newPass = String(req.body.newPassword);

		this.model.findOne({'_id': userId}, function (err, user) {
			if (user.authenticate(oldPass)) {
				user.password = newPass;

				user.save(function (err) {
					if (err) {
						return res.handleError(err);
					}
					return res.noContent();
				});
			} else {
				res.forbidden();
			}
		});
	},

	/**
	 * Get the authenticated user for the current request.
	 * The requested user id is read from the userInfo parameter of the request object.
	 * @param {IncomingMessage} req - The request message object the user object is read from
	 * @param {ServerResponse} res - The outgoing response object
	 * @param {function} next - The next handler function
	 * @returns {ServerResponse} The virtual 'profile' of this user or UNAUTHORIZED if no document has been found
	 */
	me: function (req, res, next) {
		if (!req.userInfo) {
			return res.unauthorized();
		}

		return res.ok(req.userInfo.profile);
	},

	/**
	 * Authentication callback function, redirecting to '/'.
	 * @param {IncomingMessage} req - The request message object
	 * @param {ServerResponse} res - The outgoing response object that is redirected
	 */
	authCallback: function (req, res) {
		res.redirect('/');
	}
};

UserController.prototype = _.create(ParamController.prototype, UserController.prototype);
