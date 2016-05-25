(function () {
  'use strict';

  /**
   * Register the edit controller as ClientModelDocDetailController
    */

  angular
    .module('<%= scriptAppName %>.clientModelDoc.list.detail')
    .controller('ClientModelDocDetailController', ClientModelDocDetailController);

  // add ClientModelDocDetailController dependencies to inject
  ClientModelDocDetailController.$inject = ['$state', 'clientModelDoc'];

  /**
   * ClientModelDocDetailController constructor
   */
  function ClientModelDocDetailController($state, clientModelDoc) {
    var vm = this;

    // the current clientModelDoc to display
    vm.clientModelDoc = clientModelDoc;
    // switch to the edit state
    vm.edit = edit;
    // switch to the parent state
    vm.goBack = goBack

    /**
     * Open the edit state with the current clientModelDoc
     *
     */
    function edit() {
      $state.go('^.edit', {'id': vm.clientModelDoc._id});
    }

    /**
     * Return to the parent state
     *
     */
    function goBack() {
      $state.go('^');
    }
  }
})();
