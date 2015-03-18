/**
 * An module for defining and initializing the User model.
 * Exporting the User model definition, schema and model instance.
 * @module {Object} user:model
 * @property {Object} definition - The [definition object]{@link user:model~UserDefinition}
 * @property {Schema} schema - The [mongoose model schema]{@link user:model~UserSchema}
 * @property {Model} model - The [mongoose model]{@link user:model~User}
 */
'use strict';

var mongoose = require('mongoose');
var MongooseError = require('mongoose/lib/error');
var crypto = require('crypto');
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;
var auth = require('../../lib/auth/auth.service');

var Schema = mongoose.Schema;

/**
 * The User model definition
 * @type {Object}
 * @property {String} name - The name of this user
 * @property {String} role - The role of this user, defaults to 'user'
 * @property {String} info - Information and notes about this user
 * @property {Boolean} active - Flag indicating this user is active
 * @property {String} hashedPassword - The hashed password of this user
 * @property {String} provider - The authentication provider used by this user account
 * @property {String} salt - Salt used to build the password
 */
var UserDefinition = {
	name: {type: String, required: true},
	info: String,
	active: Boolean,
	role: {type: String, default: 'user', required: true},
	hashedPassword: String,
	provider: String,
	salt: String
};

/**
 * The User model schema
 * @type {Schema}
 */
var UserSchema = new Schema(UserDefinition);

/*
 * Virtual definitions
 */

/**
 * Virtual 'password'
 * Used for getting and setting the internal hashedPassword property
 * @memberOf UserSchema
 */
UserSchema
	.virtual('password')
	.set(setPassword)
	.get(getPassword);

/**
 * Virtual 'profile'
 * Public profile information
 * @memberOf UserSchema
 */
UserSchema
	.virtual('profile')
	.get(getProfile);

/**
 * Virtual 'token'
 * Non-sensitive info we'll be putting in the token
 * @memberOf UserSchema
 */
UserSchema
	.virtual('token')
	.get(getToken);

/**
 * Validations
 */

// Validate username is not taken
UserSchema
	.path('name')
	.validate(validateUniqueName, 'The specified username is already in use.');

// Validate unique root user
UserSchema
	.path('role')
	.validate(validateUniqueRoot, 'There can only be one user with the maximum role');

// Validate empty password
UserSchema
	.path('hashedPassword')
	.validate(validateHashedPassword, 'Password cannot be blank');

/**
 * Additional instance methods
 */

/**
 * Authenticate - check if the password is correct
 *
 * @param {String} plainText
 * @return {Boolean}
 * @api public
 */
UserSchema.methods.authenticate = function authenticate(plainText) {
	return this.encryptPassword(plainText) === this.hashedPassword;
};

/**
 * Make salt
 *
 * @return {String}
 * @api public
 */
UserSchema.methods.makeSalt = function makeSalt() {
	return crypto.randomBytes(16).toString('base64');
};

/**
 * Encrypt password
 *
 * @param {String} password
 * @return {String}
 * @api public
 */
UserSchema.methods.encryptPassword = function encryptPassword(password) {
	if (!password || !this.salt) {
		return '';
	}

	var salt = new Buffer(this.salt, 'base64');
	return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
};

/**
 * Static methods
 */

/**
 * Return the root user document
 * @param {Function} cb - The callback function
 * @returns {*}
 */
UserSchema.statics.getRoot = function (cb) {
	this.findOne({role: auth.roles.getMaxRole()}, cb);
};

/**
 * Attach pre hook plugins
 */
UserSchema.plugin(requestContext, {
	propertyName: 'modifiedBy',
	contextPath: 'request:acl.user.name'
});

/**
 * Attach pre-save and pre-remove hooks
 *
 * @api private
 */
UserSchema
	.pre('save', preSave)
	.pre('remove', preRemove);

/**
 * Attach post hook plugins
 */
UserSchema.plugin(createdModifiedPlugin);

/**
 * Set the virtual password property
 *
 * @api private
 * @param {String} password - The user password to set
 */
function setPassword(password) {
	// jshint validthis: true
	this._password = password;
	this.salt = this.makeSalt();
	this.hashedPassword = this.encryptPassword(password);
}

/**
 * Get the value of the virtual password property
 *
 * @api private
 * @returns {String|*} The value of the virtual password property
 */
function getPassword() {
	// jshint validthis: true
	return this._password;
}

/**
 * Return the value of the virtual profile property
 *
 * @api private
 * @returns {{_id: *, name: *, prename: *, surname: *, email: *, active: *, role: *, info: *}}
 */
function getProfile() {
	// jshint validthis: true
	return {
		'_id': this._id,
		'name': this.name,
		'active': this.active,
		'role': this.role,
		'info': this.info
	};
}

/**
 * Return the value of the virtual token property
 *
 * @api private
 * @returns {{_id: *, role: *}}
 */
function getToken() {
	// jshint validthis: true
	return {
		'_id': this._id,
		'role': this.role
	};
}

/**
 * Check if the hashed password is specified.
 *
 * @api private
 * @param {String} hashedPassword
 * @returns {Boolean} True if the hashed password has a length
 */
function validateHashedPassword(hashedPassword) {
	return hashedPassword.length;
}

/**
 * Check existence and length of the given value.
 *
 * @api private
 * @param {String} value - The value to check
 * @returns {Boolean} True if a value with a truthy length property is given
 */
function validatePresenceOf(value) {
	return value && value.length;
}

/**
 * Validate the uniqueness of the given username
 *
 * @api private
 * @param {String} value - The username to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueName(value, respond) {
	// jshint validthis: true
	var self = this;

	// check for uniqueness of user name
	this.constructor.findOne({name: value}, function (err, user) {
		if (err) {
			throw err;
		}

		if (user) {
			// the searched name is my name or a duplicate
			return respond(self.id === user.id);
		}

		respond(true);
	});
}

/**
 * Check the uniqueness of the root role (the maximum role)
 * @api private
 * @param {String} newRole - The role name to save
 * @param {Function} respond - The callback function
 * @returns {*}
 */
function validateUniqueRoot(newRole, respond) {
	// jshint validthis: true
	var self = this;

	// attempt to create a root user
	if (auth.roles.isRoot(newRole)) {
		// check for an existing root user
		self.constructor.getRoot(function (err, rootUser) {
			if (err) {
				throw err;
			}

			if (rootUser) {
				// found a root user, if it is me everything is ok
				return respond(self.id === rootUser.id);
			}

			// there is no root user yet (should only be true once)
			respond(true);

		});
	} else {
		// any other role can be set
		respond(true);
	}
}

/**
 * Pre save hook for the User model. Validates the existence of the
 * hashedPassword property if the document is saved for the first time.
 * Ensure that only the root user can update itself.
 *
 * @api private
 * @param {Function} next - The mongoose middleware callback
 * @returns {*} If an error occurs the passed callback with an Error as its argument is called
 */
function preSave(next) {
	// jshint validthis: true
	var self = this;

	if (this.isNew && !validatePresenceOf(this.hashedPassword)) {
		return next(new MongooseError.ValidationError('Missing password'));
	}

	// check if the root user should be updated
	// return an error if some not root tries to touch the root document
	self.constructor.getRoot(function (err, rootUser) {
		if (err) {
			throw err;
		}

		// will we update the root user?
		if (rootUser && self.id === rootUser.id) {

			// delete the role to prevent loosing the root status
			delete self.role;

			// get the user role to check if a root user will perform the update
			var userRole = self.getContext('request:acl.user.role');
			if (!userRole) { // no user role - no root user check
				return next();
			}

			if (!auth.roles.isRoot(userRole)) {
				// return error, only root can update root
				return next(new MongooseError.ValidationError('Forbidden root update request'));
			}
		}

		// normal user update
		return next();
	});
}

/**
 * Pre remove hook for the User model.
 * Validates that the root user cannot be deleted.
 *
 * @api private
 * @param {Function} next - The mongoose middleware callback
 * @returns {*} If an error occurs the passed callback with an Error as its argument is called
 */
function preRemove(next) {
	// jshint validthis: true
	if (auth.roles.isRoot(this.role)) {
		return next(new MongooseError.ValidationError(auth.roles.getMaxRole() + ' role cannot be deleted'));
	}

	return next();
}

module.exports = {

	/**
	 * The User model definition object
	 * @type {Object}
	 * @see user:UserModel~UserDefinition
	 */
	definition: UserDefinition,

	/**
	 * The User model schema
	 * @type {Schema}
	 * @see user:model~UserSchema
	 */
	schema: UserSchema,

	/**
	 *  The registered mongoose model instance of the User model
	 *  @type {User}
	 */
	model: mongoose.model('User', UserSchema)
};
