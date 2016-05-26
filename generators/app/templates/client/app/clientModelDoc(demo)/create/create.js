(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.clientModelDoc.create module
   * and configure it.
   *
   * @requires ui.router
   * @requires ngMessages
   * @requires ngMaterial
   * @requires {<%= scriptAppName %>.mongooseError}
   * @requires {<%= scriptAppName %>.remoteUnique}
   * @requires {<%= scriptAppName %>.clientModelDoc.service}
   */

  angular
    .module('<%= scriptAppName %>.clientModelDoc.create', [
      'ui.router',
      'ngMessages',
      'ngMaterial',
      '<%= scriptAppName %>.mongooseError',
      '<%= scriptAppName %>.remoteUnique',
      '<%= scriptAppName %>.clientModelDoc.service'
    ])
    .config(configureClientModelDocCreateRoutes);

  // inject configClientModelDoc.CreateRoutes dependencies
  configureClientModelDocCreateRoutes.$inject = ['$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the 'clientModelDoc.list.create' state. The onEnterClientModelDocListCreateView
   * function will be called when entering the state and open a modal dialog
   * with the app/clientModelDoc/create/create.html template loaded.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configureClientModelDocCreateRoutes($stateProvider) {
    var  createListState = {
      name: 'clientModelDoc.list.create',
      parent: 'clientModelDoc.list',
      url: '/create',
      authenticate: true,
      role: 'admin',
      onEnter: onEnterClientModelDocListCreateView
    };

    $stateProvider.state(createListState);
  }

  /**
   * Function that executes when entering the clientModelDoc.list.create state.
   * Open the create dialog
   */

  onEnterClientModelDocListCreateView.$inject = ['$rootScope', '$state', '$mdDialog'];

  function onEnterClientModelDocListCreateView($rootScope, $state, $mdDialog) {
    var unregisterListener = $rootScope.$on('$stateChangeStart', onStateChange);

    $mdDialog.show({
      controller: 'ClientModelDocCreateController',
      controllerAs: 'create',
      templateUrl: 'app/clientModelDoc/create/create.html',
      clickOutsideToClose: false
    }).then(transitionTo, transitionTo);

    /**
     * Function executed when resolving or rejecting the
     * dialog promise.
     *
     * @param {*} answer - The result of the dialog callback
     * @returns {promise}
     */
    function transitionTo(answer) {
      return $state.transitionTo('clientModelDoc.list');
    }

    /**
     * Function executed when changing the state.
     * Closes the create dialog
     */
    function onStateChange() {
      unregisterListener();
    }
  }

})();
