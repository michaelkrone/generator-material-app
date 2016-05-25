/**
 * Module for registering broadcast updates to clients when
 * the ClientModelDoc model changes. Exports the
 * [register function]{@link clientModelDoc:socket~registerClientModelDocSockets}
 * to register the model schema events on the socket instance.
 * @module {function} clientModelDoc:socket
 * @requires {@link clientModelDoc:model}
 */
'use strict';

/**
 * The ClientModelDoc model instance
 * @type {clientModelDoc:model~ClientModelDoc}
 */
var ClientModelDoc = require('./clientModelDoc.model').model;

// export the function to register all socket broadcasts
exports.register = registerClientModelDocSockets;

/**
 * Register ClientModelDoc model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the ClientModelDoc model events on
 */
function registerClientModelDocSockets(socket) {
  ClientModelDoc.schema.post('save', function (doc) {
    onSave(socket, doc);
  });

  ClientModelDoc.schema.post('remove', function (doc) {
    onRemove(socket, doc);
  });
}

/**
 * Emit a ClientModelDoc save event on a socket object: 'clientModelDoc:save'
 * @param {socket.io} socket - The socket object to emit the ClientModelDoc save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
  socket.emit('clientModelDoc:save', doc);
}

/**
 * Emit a ClientModelDoc remove event on a socket object: 'clientModelDoc:remove'
 * @param {socket.io} socket - The socket object to emit the ClientModelDoc remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
  socket.emit('clientModelDoc:remove', doc);
}
