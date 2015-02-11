/**
 * Module for registering broadcast updates to clients when
 * the <%= modelName %> model changes. Exports the
 * [register function]{@link <%= name %>:socket~register<%= modelName %>Sockets}
 * to register the model schema events on the socket instance.
 * @module {function} <%= name %>:socket
 * @requires {@link <%= name %>:model}
 */
'use strict';

/**
 * The <%= modelName %> model instance
 * @type {<%= name %>:model~<%= modelName %>}
 */
var <%= modelName %> = require('./<%= name %>.model').model;

// export the function to register all socket broadcasts
exports.register = register<%= modelName %>Sockets;

/**
 * Register <%= modelName %> model change events on the passed socket
 * @param {socket.io} socket - The socket object to register the <%= modelName %> model events on
 */
function register<%= modelName %>Sockets(socket) {
	<%= modelName %>.schema.post('save', function (doc) {
		onSave(socket, doc);
	});

	<%= modelName %>.schema.post('remove', function (doc) {
		onRemove(socket, doc);
	});
}

/**
 * Emit a <%= modelName %> save event on a socket object: '<%= name %>:save'
 * @param {socket.io} socket - The socket object to emit the <%= modelName %> save event on
 * @param {MogooseDocument} doc - The saved document that triggered the event
 * @param {function} cb - The callback function
 */
function onSave(socket, doc, cb) {
	socket.emit('<%= name %>:save', doc);
}

/**
 * Emit a <%= modelName %> remove event on a socket object: '<%= name %>:remove'
 * @param {socket.io} socket - The socket object to emit the <%= modelName %> remove event on
 * @param {MogooseDocument} doc - The removed document that triggered the event
 * @param {function} cb - The callback function
 */
function onRemove(socket, doc, cb) {
	socket.emit('<%= name %>:remove', doc);
}
