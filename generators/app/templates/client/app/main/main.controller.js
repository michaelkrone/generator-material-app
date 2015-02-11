(function () {
	'use strict';

	// register the controller as MainController
	angular
		.module('<%= scriptAppName %>')
		.controller('MainController', MainController);

	// add MainController dependencies to inject
	MainController.$inject = ['$http'<% if(features.socketio) { %>, '$scope', 'socket'<% } %>];

	/**
	 * MainController constructor
	 *
	 * @param $scope
	 * @param $http
	 * @constructor
	 */
	function MainController($http<% if(features.socketio) { %>, $scope, socket<% } %>) {
		var vm = this;

		// view model bindings
		vm.awesomeThings = [];
		vm.newThing = '';
		vm.addThing = addThing;
		vm.deleteThing = deleteThing;

		activate();<% if(features.socketio) { %>

		$scope.$on('$destroy', function () {
			socket.unsyncUpdates('thing');
		});<% } %>

		function activate() {
			getThings();
		}

		function addThing() {
			if (vm.newThing === '') {
				return;
			}
			$http.post('/api/things', {name: vm.newThing});
			vm.newThing = '';
		};

		function deleteThing(thing) {
			$http.delete('/api/things/' + thing._id);
		}

		function getThings() {
			return $http
				.get('/api/things')
				.success(function (awesomeThings) {
					vm.awesomeThings = awesomeThings;<% if(features.socketio) { %>
					socket.syncUpdates('thing', vm.awesomeThings);<% } %>
					return vm.awesomeThings;
				});
		}
	}

})();
