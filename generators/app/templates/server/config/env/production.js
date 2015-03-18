'use strict';

process.env.DATABASE_NAME = process.env.DATABASE_NAME || '<%= appname %>';

module.exports = {

	ip: process.env.ip || undefined,

	port: process.env.PORT || 8080,

	publicDir: 'public',

	mongo: {
		uri: 'mongodb://localhost/' + process.env.DATABASE_NAME
	}
};
