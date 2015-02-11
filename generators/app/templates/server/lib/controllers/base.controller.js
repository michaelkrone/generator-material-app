'use strict';

var _ = require('lodash');

exports = module.exports = BaseController;

/**
 * Mother of all controller constructors
 * @classdesc This class can serves as a base class for other classes
 * in this application. It does bind all methods to its instance to
 * make sure they work in the right context.
 * @constructor
 */
function BaseController() {
	_.bindAll(this);
}
