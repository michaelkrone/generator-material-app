(function () {
  'use strict';

  /**
   * Register the list controller as ClientModelDocMainController
   */

  angular
    .module('<%= scriptAppName %>.clientModelDoc.main')
    .controller('ClientModelDocMainController', ClientModelDocMainController);

  // add ClientModelDocMainController dependencies to inject
  ClientModelDocMainController.$inject = ['$state'];

  /**
   * ClientModelDocMainController constructor
   */
  function ClientModelDocMainController($state) {
    var vm = this;
    // switch to the list state
    vm.showList = showList;

    /**
     * Activate the clientModelDoc.list state
     */
    function showList() {
      $state.go('clientModelDoc.list');
    }
  }

})();
