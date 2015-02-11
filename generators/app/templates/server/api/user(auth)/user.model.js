/**
 * An module for defining and initializing the User model.
 * Exporting the User model definition, schema and model instance.
 * @module {Object} user:model
 * @property {Object} definition - The [definition object]{@link user:model~UserDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link user:model~UserSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link user:model~User}
 */
'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');

/**
 * The User model definition
 * @type {Object}
 * @property {String} name - The name of this user
 * @property {String} prename - The prename of this user
 * @property {String} surname - The surname of this user
 * @property {String} email - The email address of this user, converted to lowercase
 * @property {String} role - The role of this user, defaults to 'user'
 * @property {String} info - Information and notes about this user
 * @property {Boolean} active - Flag indicating this user is active
 * @property {String} hashedPassword - The hashed password of this user
 * @property {String} provider - The authentication provider used by this user account
 * @property {String} salt - Salt used to build the password
 */
var UserDefinition = {
	name: String,
	prename: String,
	surname: String,
	email: {type: String, lowercase: true},
	role: {type: String, default: 'user'},
	info: String,
	active: Boolean,
	hashedPassword: String,
	provider: String,
	salt: String
};

/**
 * The User model schema
 * @type {MongooseSchema}
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

// Validate empty email
UserSchema
	.path('email')
	.validate(validateEmptyEmail, 'Email cannot be blank');

// Validate empty password
UserSchema
	.path('hashedPassword')
	.validate(validateHashedPassword, 'Password cannot be blank');

/**
 * Pre-save hook
 *
 * @api private
 */
UserSchema
	.pre('save', preSave);

/**
 * Methods
 */
UserSchema.methods = {

	/**
	 * Authenticate - check if the password is correct
	 *
	 * @param {String} plainText
	 * @return {Boolean}
	 * @api public
	 */
	authenticate: function authenticate(plainText) {
		return this.encryptPassword(plainText) === this.hashedPassword;
	},

	/**
	 * Make salt
	 *
	 * @return {String}
	 * @api public
	 */
	makeSalt: function makeSalt() {
		return crypto.randomBytes(16).toString('base64');
	},

	/**
	 * Encrypt password
	 *
	 * @param {String} password
	 * @return {String}
	 * @api public
	 */
	encryptPassword: function encryptPassword(password) {
		if (!password || !this.salt) {
			return '';
		}

		var salt = new Buffer(this.salt, 'base64');
		return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
	}
};

/**
 * Set the virtual password property
 *
 * @api private
 * @param {String} password - The user password to set
 */
function setPassword(password) {
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
	return this._password;
}

/**
 * Return the value of the virtual profile property
 *
 * @api private
 * @returns {{_id: *, name: *, prename: *, surname: *, email: *, active: *, role: *, info: *}}
 */
function getProfile() {
	return {
		'_id': this._id,
		'name': this.name,
		'prename': this.prename,
		'surname': this.surname,
		'email': this.email,
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
	return {
		'_id': this._id,
		'role': this.role
	};
}

/**
 * Validate existence of the given email
 *
 * @api private
 * @param {String} email - The email to check
 * @returns {Boolean} True if the given email has a length
 */
function validateEmptyEmail(email) {
	return !!email.length;
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
 * Validate the uniqueness of the given username
 *
 * @api private
 * @param {String} value - The username to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueName(value, respond) {
	var self = this;
	this.constructor.findOne({name: value}, function (err, user) {
		if (err) {
			throw err;
		}

		if (user) {
			if (self.id === user.id) {
				return respond(true);
			}

			return respond(false);
		}
		respond(true);
	});
}
/**
 * Check existence and length of the given value.
 *
 * @api private
 * @param {String} value - The value to ckeck
 * @returns {Boolean} True if a value with a truthy length property is given
 */
function validatePresenceOf(value) {
	return value && value.length;
}

/**
 * Pre save hook for the User model. Validates the existance of the
 * hashedPassword property if the document is saved for the first time.
 *
 * @api private
 * @param {Function} next - The mongoose middleware callback
 * @returns {*} If an error occurs the passed callback with an Error as its argument is called
 */
function preSave(next) {
	if (!this.isNew) {
		return next();
	}

	if (!validatePresenceOf(this.hashedPassword)) {
		next(new Error('Invalid password'));
	} else {
		next();
	}
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
	 * @type {MongooseSchema}
	 * @see user:model~UserSchema
	 */
	schema: UserSchema,

	/**
	 *  The registered mongoose model instance of the User model
	 *  @type {User}
	 */
	model: mongoose.model('User', UserSchema)
};
