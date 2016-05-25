(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.clientModelDoc.main module
   * and configure it.
   *
   * @requires ui.router
   * @requires <%= scriptAppName %>.mainMenu
   */

  angular
    .module('<%= scriptAppName %>.clientModelDoc.main', [
      'ui.router',
      '<%= scriptAppName %>.mainMenu'
    ])
    .config(configClientModelDocMainRoutes);

  // inject configClientModelDocMainRoutes dependencies
  configClientModelDocMainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the clientModelDoc.main state with the list template for the
   * 'main' view paired with the ClientModelDocMainController as 'main'.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
   */
  function configClientModelDocMainRoutes($stateProvider, mainMenuProvider) {
    // The main state configuration
    var mainState = {
      name: 'clientModelDoc.main',
      parent: 'clientModelDoc',
      url: '/',
      authenticate: true,
      role: 'admin',
      views: {
        '@clientModelDoc': {
          templateUrl: 'app/clientModelDoc/main/main.html',
          controller: 'ClientModelDocMainController',
          controllerAs: 'main'
        }
      }
    };

    $stateProvider.state(mainState);

    mainMenuProvider.addMenuItem({
      name: 'ClientModelDoc',
      state: mainState.name,
      role: 'admin'
    });
  }

})();
