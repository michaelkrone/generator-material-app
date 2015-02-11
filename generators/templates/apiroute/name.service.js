(function () {
	'use strict';

	/**
	 * Introduce the <%= scriptAppName %>.<%= _.slugify(name) %>.service module.
	 * Register the <%= name %> resource as <%= classedName %>, register the
	 * service as <%= classedName %>Service.
	 *
	 * @requires {<%= scriptAppName %>.resource}
	 */
	angular
		.module('<%= scriptAppName %>.<%= _.slugify(name) %>.service', ['<%= scriptAppName %>.resource'])
		.factory('<%= classedName %>', <%= classedName %>)
		.service('<%= classedName %>Service', <%= classedName %>Service);

	// add <%= classedName %> dependencies to inject
	<%= classedName %>.$inject = ['Resource'];

	/**
	 * <%= classedName %> resource constructor
	 */
	function <%= classedName %>($resource) {
		// factory members
		var apiURL = '<%= apiURL%>';
		// public API
		return $resource(apiURL + '/:id/:controller');
	}

	// add <%= classedName %>Service dependencies to inject
	<%= classedName %>Service.$inject = ['<%= classedName %>'];

	/**
	 * <%= classedName %>Service constructor
	 * AngularJS will instantiate a singleton by calling "new" on this function
	 *
	 * @param {$resource} <%= classedName %> The resource provided by <%= scriptAppName %>.<%= _.slugify(name) %>.resource
	 * @returns {Object} The service definition for the <%= classedName %>Service service
	 */
	function <%= classedName %>Service(<%= classedName %>) {

		return {
			create: create,
			update: update,
			remove: remove
		};

		/**
		 * Save a new <%= name %>
		 *
		 * @param  {Object}   <%= name %> - <%= name %>Data
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function create(<%= name %>, callback) {
			var cb = callback || angular.noop;

			return <%= classedName %>.create(<%= name %>,
				function (<%= name %>) {
					return cb(<%= name %>);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Remove a <%= name %>
		 *
		 * @param  {Object}   <%= name %> - <%= name %>Data
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function remove(<%= name %>, callback) {
			var cb = callback || angular.noop;

			return <%= classedName %>.remove({id: <%= name %>._id},
				function (<%= name %>) {
					return cb(<%= name %>);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}

		/**
		 * Create a new <%= name %>
		 *
		 * @param  {Object}   <%= name %> - <%= name %>Data
		 * @param  {Function} callback - optional
		 * @return {Promise}
		 */
		function update(<%= name %>, callback) {
			var cb = callback || angular.noop;

			return <%= classedName %>.update(<%= name %>,
				function (<%= name %>) {
					return cb(<%= name %>);
				},
				function (err) {
					return cb(err);
				}).$promise;
		}
	};
})();
