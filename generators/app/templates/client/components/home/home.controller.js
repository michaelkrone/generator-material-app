/**
 * @ngdoc controller
 * @name <%= scriptAppName %>.home.controller:HomeController
 * @description
 * Controller for the main component
 */

(function () {
	'use strict';

	// register the controller as HomeController
	angular
		.module('<%= scriptAppName %>.home')
		.controller('HomeController', HomeController);

	/**
	 * @ngdoc function
	 * @name <%= scriptAppName %>.main.provider:HomeController
	 * @description
	 * Provider of the {@link <%= scriptAppName %>.home.controller:HomeController HomeController}
	 *
	 * @param {Service} $router The router service to use
	 */

	HomeController.$inject = [<% if(features.auth) { %>'Auth'<% }%>];

	function HomeController(<% if(features.auth) { %>Auth<% }%>) {
		var vm = this;

		/**
		 * @ngdoc property
		 * @name greeting
		 * @propertyOf <%= scriptAppName %>.home.controller:HomeController
		 * @description
		 * The polite greeting of this sublime controller.
		 *
		 */
		vm.greeting = 'Milord, this is the HomeController.';

		/**
		 * @ngdoc property
		 * @name features
		 * @propertyOf <%= scriptAppName %>.home.controller:HomeController
		 * @description
		 * The list of app features.
		 *
		 */
		vm.features = [
			{name: 'Node.js', link: 'https://nodejs.org/', color: 'green', icon: 'https://nodejs.org/images/logos/logos/nodejs.png', size: {col: 2, row: 1}},
			{name: 'Express', link: 'http://expressjs.com/', color: 'white', icon: 'http://assets.toptal.io/uploads/blog/category/logo/25/express_js.png', size: {col: 1, row: 1}},
			{name: 'Angular.js', link: 'https://angular.io/', color: 'deepBlue', icon: 'https://angular.io/resources/images/logos/standard/shield-large.png', size: {col: 1, row: 2}},
			{name: 'mongoDB', link: 'https://www.mongodb.org/', color: 'brown', icon: 'https://www.mongodb.org/static/images/mongodb-logo.png', size: {col: 1, row: 1}},
			{name: 'mongoose', link: 'http://mongoosejs.com/', color: 'blue', icon: 'http://mongodb-tools.com/img/mongoose.png', size: {col: 1, row: 1}},
			{name: 'Gulp', link: 'http://gulpjs.com/', color: 'red', icon: 'http://gulpjs.com/img/gulp-white-text.svg', size: {col: 1, row: 1}},
			{name: 'Sass', link: 'http://sass-lang.com/', color: 'pink', icon: 'http://sass-lang.com/assets/img/logos/logo-b6e1ef6e.svg', size: {col: 1, row: 1}}<% if(features.socketio) { %>,
			{name: 'socket.io', link: 'http://socket.io/', color: 'gray', icon: 'http://cdn.socket.io/website/imgs/logo.svg', size: {col: 1, row: 1}}<% }%>
		];<% if(features.auth) { %>

		/**
		 * @ngdoc property
		 * @name auth
		 * @propertyOf <%= scriptAppName %>.home.controller:HomeController
		 * @description
		 * The auth service of this controller.
		 *
		 */
		vm.auth = Auth;<% }%>
	}<% if(features.auth) { %>

	HomeController.prototype.canActivate = function () {
		return this.auth.isLoggedIn();
	};<% }%>

})();
