(function () {
	'use strict';

	// register the service as <%= classedName %>
	angular
		.module('<%= scriptAppName %>')
		.factory('<%= classedName %>', <%= classedName %>);

	// add <%= classedName %> dependencies to inject
	<% if (features.useOriginalResource) { %><%= classedName %>.$inject  = ['$resource'];<% } else { %><%= classedName %>.$inject = ['Resource'];<% } %>

	/**
	 * <%= classedName %> resource constructor
	 */
	function <%= classedName %>($resource) {
		// factory members
		var apiURL = '<%= apiURL%>';
		// public API
		<% if (features.useOriginalResource) { %>return $resource(apiURL + '/:id/:controller', {id: '@_id'});<% } else { %>return $resource(apiURL + '/:id/:controller');<% } %>
	}

})();
