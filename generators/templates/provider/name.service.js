(function () {
	'use strict';

	// register the service as <%= classedName %>Service
	angular.module('<%= scriptAppName %>')
		.provider('<%= classedName %>', <%= classedName %>Provider);

	/**
	 * <%= classedName %>Provider definition
	 * AngularJS will instantiate a singleton which is
	 * the object resulting from the $get method call
	 * However, providers can be configured in the config
	 * phase of your angular application
	 */
	function <%= classedName %>Provider() {
		// factory members
		var name = '<%= name %>';

		// public configuration API
		this.setName = function setName(s) {
			name = s;
		};

		// a private constructor
		function <%= classedName %>() {
			this.greet = function () {
				return name;
			};
		}

		// Method for instantiating
		this.$get = [/*['injects'] ,*/ function <%= name %>Factory(/* injectts */) {
			return new <%= classedName %>();
		}];
	}

})();
