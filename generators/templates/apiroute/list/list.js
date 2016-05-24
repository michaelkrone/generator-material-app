(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.<%= moduleName %>.list module
   * and configure it.
   * @requires ui.router
   * @requires ngMaterial<% if(features.socketio) { %>
   * @requires <%= scriptAppName %>.socket<% }%>
   * @requires <%= scriptAppName %>.mainMenu,
   * @requires <%= scriptAppName %>.toggleComponent,
   * @requires <%= scriptAppName %>.<%= moduleName %>.list.detail
   * @requires <%= scriptAppName %>.<%= moduleName %>.list.edit
   * @requires <%= scriptAppName %>.<%= moduleName %>.list.items
   */

  angular
    .module('<%= scriptAppName %>.<%= moduleName %>.list', [
      'ngMaterial',
      'ui.router',<% if(features.socketio) { %>
      '<%= scriptAppName %>.socket',<% }%>
      '<%= scriptAppName %>.mainMenu',
      '<%= scriptAppName %>.toggleComponent',
      '<%= scriptAppName %>.<%= moduleName %>.list.detail',
      '<%= scriptAppName %>.<%= moduleName %>.list.edit',
      '<%= scriptAppName %>.<%= moduleName %>.list.items'
    ])
    .config(config<%= classedName %>ListRoutes);

  // inject config<%= classedName %>ListRoutes dependencies
  config<%= classedName %>ListRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the <%= moduleName %>.list state with the list template fpr the
   * 'main' view paired with the <%= classedName %>ListController as 'list'.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function config<%= classedName %>ListRoutes($stateProvider, mainMenuProvider) {
    // The list state configuration
    var listState = {
      name: '<%= moduleName %>.list',
      parent: '<%= moduleName %>',
      url: '/list',<% if (secure) {%>
      authenticate: true,
      role: '<%= role %>',<%}%>
      resolve: {
        <%= cameledName %>s:  resolve<%= classedName %>s
      },
      views: {

        // target the unnamed view in the <%= moduleName %> state
        '@<%= moduleName %>': {
          templateUrl: '<%= listHtmlUrl %>',
          controller: '<%= classedName %>ListController',
          controllerAs: 'list'
        },

        // target the content view in the <%= moduleName %>.list state
        'content@<%= moduleName %>.list': {
          templateUrl: '<%= listItemsHtmlUrl %>',
          controller: '<%= classedName %>ItemsController',
          controllerAs: 'items'
        }
      }
    };

    $stateProvider.state(listState);

    mainMenuProvider.addSubMenuItem('<%= moduleName %>.main', {
      name: '<%= menuItem %> List',
      state: listState.name
    });
  }

  // inject resolve<%= classedName %>s dependencies
  resolve<%= classedName %>s.$inject = ['<%= classedName %>'];

  /**
   * Resolve dependencies for the <%= moduleName %>.list state
   *
   * @params {<%= classedName %>} <%= classedName %> - The service to query <%= cameledName %>s
   * @returns {Promise} A promise that, when fullfilled, returns an array of <%= cameledName %>s
   */
  function resolve<%= classedName %>s(<%= classedName %>) {
    return <%= classedName %>.query().$promise;
  }

})();
