'use strict';

module.exports = {

	ip: process.env.ip || undefined,

	port: process.env.PORT || 8080,

	publicDir: 'public',

	mongo: {
		uri: 'mongodb://localhost/<%= appname %>'
	}
};
