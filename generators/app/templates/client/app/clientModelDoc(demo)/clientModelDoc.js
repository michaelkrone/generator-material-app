(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.clientModelDoc module
   * and configure it.
   *
   * @requires ui.router
   * @requires ngResource
   * @requires <%= scriptAppName %>.clientModelDoc.main
   * @requires <%= scriptAppName %>.clientModelDoc.list
   * @requires <%= scriptAppName %>.clientModelDoc.create
   */
  angular
    .module('<%= scriptAppName %>.clientModelDoc', [
      'ngResource',
      'ui.router',
      '<%= scriptAppName %>.clientModelDoc.main',
      '<%= scriptAppName %>.clientModelDoc.list',
      '<%= scriptAppName %>.clientModelDoc.create'
    ])
    .config(configClientModelDocRoutes);

  // inject configClientModelDocRoutes dependencies
  configClientModelDocRoutes.$inject = ['$urlRouterProvider', '$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the abstract clientModelDoc state with the clientModelDoc template
   * paired with the ClientModelDocController as 'index'.
   * The injectable 'clientModelDocs' is resolved as a list of all clientModelDocs
   * and can be injected in all sub controllers.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configClientModelDocRoutes($urlRouterProvider, $stateProvider) {
    // The clientModelDoc state configuration
    var clientModelDocState = {
      name: 'clientModelDoc',
      url: '/client-model-doc',
      abstract: true,
      templateUrl: 'app/clientModelDoc/clientModelDoc.html',
      controller: 'ClientModelDocController',
      controllerAs: 'index'
    };

    $urlRouterProvider.when('/clientModelDoc', '/clientModelDoc/');
    $stateProvider.state(clientModelDocState);
  }

})();
