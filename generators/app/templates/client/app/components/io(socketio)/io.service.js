(function () {
	'use strict';

	angular
		.module('<%= scriptAppName %>.io', [])
		.factory('io', IOService);

	// inject IOService dependencies
	IOService.$inject = ['$window'];

	/**
	 *
	 * IOService constructor
	 * @param $window
	 * @returns {*}
	 * @constructor
	 */
	function IOService($window) {
		// remove io from global object
		var io = $window.io;
		delete $window.io;
		return io;
	}

})();
