(function () {
  'use strict';

  /**
   * Register the list controller as ClientModelDocListController
   */
  angular
    .module('<%= scriptAppName %>.clientModelDoc.list')
    .controller('ClientModelDocListController', ClientModelDocListController);

  // add ClientModelDocListController dependencies to inject
  ClientModelDocListController.$inject = ['$scope', 'socket', '$state', 'clientModelDocs', 'ToggleComponent'];

  /**
   * ClientModelDocListController constructor
   *
   * @param {Object} $scope - The current scope
   * @param {Object} socket - The socket service to register to
   * @param {$state} $state - The $state to activate routing states on
   * @param {Array} clientModelDocs - The list of clientModelDocs resolved for this route
   * @param {Service} ToggleComponent - The service for switching the detail view
   */
  function ClientModelDocListController($scope, socket, $state, clientModelDocs, ToggleComponent) {
    var vm = this;

    // the array of clientModelDocs
    vm.clientModelDocs = clientModelDocs;
    // toggle detail view
    vm.toggleDetails = toggleDetails;

    // initialize the controller
    activate();

    /**
     * Register socket updates and unsync on scope $destroy event
     */
    function activate() {
      socket.syncUpdates('clientModelDoc', vm.clientModelDocs);
      $scope.$on('$destroy', unsyncClientModelDocUpdates);

      function unsyncClientModelDocUpdates() {
        socket.unsyncUpdates('clientModelDoc');
      }
    }

    /**
     * Toggle the detail view
     */
    function toggleDetails() {
      ToggleComponent('clientModelDoc.detailView').toggle();
    }
  }

})();
