(function () {
  'use strict';

  // register the controller as ClientModelDocController
  angular
    .module('<%= scriptAppName %>.clientModelDoc')
    .controller('ClientModelDocController', ClientModelDocController);

  /**
   * add ClientModelDocController dependencies to inject
   * @param {Service} ClientModelDocDefinition The model definition of ClientModelDoc resource
   */
  ClientModelDocController.$inject = ['ClientModelDocDefinition'];

  /**
   * ClientModelDocController constructor. Main controller for the <%= scriptAppName %>.clientModelDoc
   * module.
   *
   * @param {$scope} $scope - The scope to listen for events
   * @param {socket.io} socket - The socket to register updates
   */
  function ClientModelDocController(ClientModelDocDefinition) {
    var vm = this;

    vm.clientModelDocDefinition = ClientModelDocDefinition;
  }

})();
