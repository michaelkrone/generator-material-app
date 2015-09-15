'use strict';<% if (features.db) { %>

process.env.DATABASE_NAME = process.env.DATABASE_NAME || '<%= appname %>';<% } %>

module.exports = {

	ip: process.env.ip || undefined,

	port: process.env.PORT || 8080,

	publicDir: 'public'<% if (features.db) { %>,

	mongo: {
		uri: 'mongodb://127.0.0.1/' + process.env.DATABASE_NAME
	}<% } %>
};
