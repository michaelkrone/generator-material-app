/**
 * Module for the controller definition of the clientModelDoc api.
 * The ClientModelDocController is handling /api/client-model-docs requests.
 * @module {clientModelDoc:controller~ClientModelDocController} clientModelDoc:controller
 * @requires {@link ParamController}
 */
'use strict';

module.exports = ClientModelDocController;

var ParamController = require('../../lib/controllers/param.controller');

/**
 * The ClientModelDoc model instance
 * @type {clientModelDoc:model~ClientModelDoc}
 */
var ClientModelDoc = require('./clientModelDoc.model').model;

/**
 * ClientModelDocController constructor
 * @classdesc Controller that handles /api/client-model-docs route requests
 * for the clientModelDoc api.
 * Uses the 'clientModelDocId' parameter and the 'clientModelDocParam' request property
 * to operate with the [main clientModelDoc API Model]{@link clientModelDoc:model~ClientModelDoc} model.
 * @constructor
 * @inherits ParamController
 * @see clientModelDoc:model~ClientModelDoc
 */
function ClientModelDocController(router) {
  ParamController.call(this, ClientModelDoc,  router);

  // modify select only properties
  // this.select = ['-__v'];

  // omit properties on update
  // this.omit = ['hashedPassword'];

  // populate refs on get
  this.populations = ['user', 'rootUser', 'anyTypeRef'];

  // property to return (maybe a virtual getter of the model)
  // this.defaultReturn = 'profile';
}

// define properties for the ClientModelDocController here
ClientModelDocController.prototype = {

  /**
   * Set our own constructor property for instanceof checks
   * @private
   */
  constructor: ClientModelDocController

};

// inherit from ParamController
ClientModelDocController.prototype = Object.create(ParamController.prototype);

