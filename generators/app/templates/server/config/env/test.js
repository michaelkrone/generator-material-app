'use strict';<% if (features.db) { %>

process.env.DATABASE_NAME = process.env.DATABASE_NAME || '<%= appname %>-test';<% } %>

module.exports = {<% if (features.db) { %>

	mongo: {
		uri: 'mongodb://127.0.0.1/' + process.env.DATABASE_NAME
	},

	seedDB: true<% } %>
};
