/**
 * Module for the controller definition of the <%= name %> api.
 * The <%= modelName %>Controller is handling <%= route %> requests.
 * @module {<%= name %>:controller~<%= modelName %>Controller} <%= name %>:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = <%= modelName %>Controller;

var ParamController = require('../../lib/controllers/param.controller');

/**
 * The <%= modelName %> model instance
 * @type {<%= name %>:model~<%= modelName %>}
 */
var <%= modelName %> = require('./<%= name %>.model').model;

/**
 * <%= modelName %>Controller constructor
 * @classdesc Controller that handles <%= route %> route requests
 * for the <%= name %> api.
 * Uses the '<%= name %>Id' parameter and the '<%= name %>Param' request property
 * to operate with the [main <%= name %> API Model]{@link <%= name %>:model~<%= modelName %>} model.
 * @constructor
 * @inherits ParamController
 * @see <%= name %>:model~<%= modelName %>
 */
function <%= modelName %>Controller(router) {
	ParamController.call(this, <%= modelName %>,  router);

	// modify select only properties
	// this.select = ['-__v'];

	// omit properties on update
	// this.omit = ['hashedPassword'];

	// property to return (maybe a virtual getter of the model)
	// this.defaultReturn = 'profile';
}

// define properties for the <%= modelName %>Controller here
<%= modelName %>Controller.prototype = {

	/**
	 * Set our own constructor property for instanceof checks
	 * @private
	 */
	constructor: <%= modelName %>Controller

};

// inherit from ParamController
<%= modelName %>Controller.prototype = Object.create(ParamController.prototype);

