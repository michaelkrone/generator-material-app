/**
 * An module for defining and initializing the ClientModelDoc model.
 * Exporting the ClientModelDoc model definition, schema and model instance.
 * @module {Object} clientModelDoc:model
 * @property {Object} definition - The [definition object]{@link clientModelDoc:model~ClientModelDocDefinition}
 * @property {MongooseSchema} schema - The [mongoose model schema]{@link clientModelDoc:model~ClientModelDocSchema}
 * @property {MongooseModel} model - The [mongoose model]{@link clientModelDoc:model~ClientModelDoc}
 */
'use strict';

var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.Types.ObjectId;
var requestContext = require('mongoose-request-context');
var createdModifiedPlugin = require('mongoose-createdmodified').createdModifiedPlugin;

/**
 * The ClientModelDoc model definition
 * @type {Object}
 * @property {String} name - The name of this clientModelDoc
 * @property {String} info - Details about this clientModelDoc
 * @property {Boolean} active - Flag indicating this clientModelDoc is active
 */
var ClientModelDocDefinition = {
  name: {type: String, required: true},
  user: {type: ObjectId, ref: 'User'},
  rootUser: {type: ObjectId, ref: 'User'},
  anyType: {type: String},
  anyTypeRef: {type: ObjectId, refPath: 'anyType'},
  important: String,
  notImportant: String,
  nested: {
    name: String,
    firstName: String,
  },
  info: String,
  active: Boolean
};

/**
 * The ClientModelDoc model schema
 * @type {MongooseSchema}
 */
var ClientModelDocSchema = new mongoose.Schema(ClientModelDocDefinition);

/**
 * Attach security related plugins
 */
ClientModelDocSchema.plugin(createdModifiedPlugin);

ClientModelDocSchema.plugin(requestContext, {
  propertyName: 'modifiedBy',
  contextPath: 'request:acl.user.name'
});

/**
 * Validations
 */
ClientModelDocSchema
  .path('name')
  .validate(validateUniqueName, 'The specified name is already in use.');

/**
 *  The registered mongoose model instance of the ClientModelDoc model
 *  @type {ClientModelDoc}
 */
var ClientModelDoc = mongoose.model('ClientModelDoc', ClientModelDocSchema);

module.exports = {

  /**
   * The ClientModelDoc model definition object
   * @type {Object}
   * @see clientModelDoc:ClientModelDocModel~ClientModelDocDefinition
   */
  definition: ClientModelDocDefinition,

  /**
   * The ClientModelDoc model schema
   * @type {MongooseSchema}
   * @see clientModelDoc:model~ClientModelDocSchema
   */
  schema: ClientModelDocSchema,

  /**
   * The ClientModelDoc model instance
   * @type {clientModelDoc:model~ClientModelDoc}
   */
  model: ClientModelDoc

};

/**
 * Validate the uniqueness of the given name
 *
 * @api private
 * @param {String} value - The username to check for uniqueness
 * @param {Function} respond - The callback function
 */
function validateUniqueName(value, respond) {
  // jshint validthis: true
  var self = this;

  // check for uniqueness of user name
  this.constructor.findOne({name: value}, function (err, clientModelDoc) {
    if (err) {
      throw err;
    }

    if (clientModelDoc) {
      // the searched name is my name or a duplicate
      return respond(self.id === clientModelDoc.id);
    }

    respond(true);
  });
}
