/**
 * @ngdoc controller
 * @name <%= moduleName %>.controller:FeaturesController
 * @description
 * Provides a list of features.
 */

(function () {
	'use strict';

	// register the controller as FeaturesController
	angular
		.module('<%= moduleName %>')
		.controller('FeaturesController', FeaturesController);

	/**
	 * @ngdoc function
	 * @name <%= moduleName %>.provider:FeaturesController
	 * @description
	 * Provider of the {@link <%= moduleName %>.controller:FeaturesController FeaturesController}
	 */

	// add FeaturesController dependencies to inject
	// FeaturesController.$inject = [];

	function FeaturesController() {
		var vm = this;


		// DELETE SELECTION START


		/**
		 * @ngdoc property
		 * @name title
		 * @propertyOf <%= moduleName %>.controller:FeaturesController
		 * @description
		 * The title of this component
		 */
		vm.title = 'Features';

		/**
		 * @ngdoc property
		 * @name greeting
		 * @propertyOf <%= moduleName %>.controller:FeaturesController
		 * @description
		 * The polite greeting of this sublime controller.
		 */
		vm.greeting = 'Milord, this is the FeaturesController.';

		/**
		 * @ngdoc property
		 * @name features
		 * @propertyOf <%= moduleName %>.controller:FeaturesController
		 * @description
		 * The list of app features.
		 */
		vm.features = [
			{name: 'Node.js', link: 'https://nodejs.org/', color: 'white', icon: 'https://nodejs.org/images/logos/logos/nodejs.png', sub: 'The platform', text: 'Node.js® is a platform built on Chrome\'s JavaScript runtime for easily building fast, scalable network applications. Node.js uses an event-driven, non-blocking I/O model that makes it lightweight and efficient, perfect for data-intensive real-time applications that run across distributed devices.'},
			{name: 'Angular.js', link: 'https://angular.io/', color: 'deepBlue', icon: 'https://angular.io/resources/images/logos/standard/shield-large.png', sub: 'The client', text: 'Angular is a development platform for building mobile and desktop web applications.'},<% if(features.db) { %>
			{name: 'mongoDB', link: 'https://www.mongodb.org/', color: 'brown', icon: 'https://www.mongodb.org/static/images/mongodb-logo.png', sub: 'The database', text: 'MongoDB’s document data model makes it easy for you to store data of any structure and dynamically modify the schema.'},<% } %>
			{name: 'Express', link: 'http://expressjs.com/', color: 'white', icon: 'https://i.cloudup.com/zfY6lL7eFa-3000x3000.png', sub: 'The server', text: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.'},<% if(features.db) { %>
			{name: 'mongoose', link: 'http://mongoosejs.com/', color: 'blue', icon: 'http://mongodb-tools.com/img/mongoose.png', sub: 'The ODM', text: 'Mongoose provides a straight-forward, schema-based solution to modeling your application data and includes built-in type casting, validation, query building, business logic hooks and more, out of the box.'},<% } %>
			{name: 'Gulp', link: 'http://gulpjs.com/', color: 'red', icon: 'http://gulpjs.com/img/gulp-white-text.svg', sub: 'The build tool', text: 'By preferring code over configuration, gulp keeps things simple and makes complex tasks manageable.'},
			{name: 'Sass', link: 'http://sass-lang.com/', color: 'pink', icon: 'http://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg', sub: 'CSS with superpowers', text: 'Sass is the most mature, stable, and powerful professional grade CSS extension language in the world.'}<% if(features.socketio) { %>,
			{name: 'socket.io', link: 'http://socket.io/', color: 'gray', icon: 'http://cdn.socket.io/website/imgs/logo.svg', sub: 'The realtime', text: 'Socket.IO enables real-time bidirectional event-based communication. It works on every platform, browser or device, focusing equally on reliability and speed.'}<% }%>
		];


		// DELETE SELECTION END


	}

})();
