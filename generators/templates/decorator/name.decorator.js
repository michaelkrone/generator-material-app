(function () {
	'use strict';

	// register the decorator config
	angular
		.module('<%= scriptAppName %>')
		.config(<%= name %>Config);

	// add <%= name %>Config dependencies to inject
	<%= name %>Config.$inject = ['$provide'];

	// the config function to decorate the service
	function <%= name %>Config($provide) {
		$provide.decorator('<%= serviceToDecorate %>', <%= classedName %>Decorator);
	}

	// add <%= classedName %> dependencies to inject
	<%= classedName %>Decorator.$inject = ['$delegate'];

	/**
	 * <%= classedName %>Decorator constructor
	 */
	function <%= classedName %>Decorator($delegate) {
		// factory members
		var name = '<%= name %>';

		// public API
		return function <%= classedName %>DecoratorFunction() {
			// apply decorations to $delegate
			$delegate.getName = function getDelegatedName() {
				return name;
			};

			return $delegate;
		}
	}

})();
