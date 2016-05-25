(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.clientModelDoc.list module
   * and configure it.
   * @requires ui.router
   * @requires ngMaterial
   * @requires <%= scriptAppName %>.socket
   * @requires <%= scriptAppName %>.mainMenu,
   * @requires <%= scriptAppName %>.toggleComponent,
   * @requires <%= scriptAppName %>.clientModelDoc.list.detail
   * @requires <%= scriptAppName %>.clientModelDoc.list.edit
   * @requires <%= scriptAppName %>.clientModelDoc.list.items
   */

  angular
    .module('<%= scriptAppName %>.clientModelDoc.list', [
      'ngMaterial',
      'ui.router',
      '<%= scriptAppName %>.socket',
      '<%= scriptAppName %>.mainMenu',
      '<%= scriptAppName %>.toggleComponent',
      '<%= scriptAppName %>.clientModelDoc.list.detail',
      '<%= scriptAppName %>.clientModelDoc.list.edit',
      '<%= scriptAppName %>.clientModelDoc.list.items'
    ])
    .config(configClientModelDocListRoutes);

  // inject configClientModelDocListRoutes dependencies
  configClientModelDocListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the clientModelDoc.list state with the list template fpr the
   * 'main' view paired with the ClientModelDocListController as 'list'.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function configClientModelDocListRoutes($stateProvider, mainMenuProvider) {
    // The list state configuration
    var listState = {
      name: 'clientModelDoc.list',
      parent: 'clientModelDoc',
      url: '/list',
      authenticate: true,
      role: 'admin',
      resolve: {
        clientModelDocs:  resolveClientModelDocs
      },
      views: {

        // target the unnamed view in the clientModelDoc state
        '@clientModelDoc': {
          templateUrl: 'app/clientModelDoc/list/list.html',
          controller: 'ClientModelDocListController',
          controllerAs: 'list'
        },

        // target the content view in the clientModelDoc.list state
        'content@clientModelDoc.list': {
          templateUrl: 'app/clientModelDoc/list/items/items.html',
          controller: 'ClientModelDocItemsController',
          controllerAs: 'items'
        }
      }
    };

    $stateProvider.state(listState);

    mainMenuProvider.addSubMenuItem('clientModelDoc.main', {
      name: 'ClientModelDoc List',
      state: listState.name
    });
  }

  // inject resolveClientModelDocs dependencies
  resolveClientModelDocs.$inject = ['ClientModelDoc'];

  /**
   * Resolve dependencies for the clientModelDoc.list state
   *
   * @params {ClientModelDoc} ClientModelDoc - The service to query clientModelDocs
   * @returns {Promise} A promise that, when fullfilled, returns an array of clientModelDocs
   */
  function resolveClientModelDocs(ClientModelDoc) {
    return ClientModelDoc.query().$promise;
  }

})();
