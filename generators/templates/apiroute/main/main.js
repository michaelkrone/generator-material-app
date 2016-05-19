(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.<%= moduleName %>.main module
   * and configure it.
   *
   * @requires ui.router
   * @requires <%= scriptAppName %>.mainMenu
   */

  angular
    .module('<%= scriptAppName %>.<%= moduleName %>.main', [
      'ui.router',
      '<%= scriptAppName %>.mainMenu'
    ])
    .config(config<%= classedName %>MainRoutes);

  // inject config<%= classedName %>MainRoutes dependencies
  config<%= classedName %>MainRoutes.$inject = ['$stateProvider', 'mainMenuProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the <%= moduleName %>.main state with the list template for the
   * 'main' view paired with the <%= classedName %>MainController as 'main'.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   * @param {mainMenuProvider} mainMenuProvider - The service to pass navigation information to
   */
  function config<%= classedName %>MainRoutes($stateProvider, mainMenuProvider) {
    // The main state configuration
    var mainState = {
      name: '<%= moduleName %>.main',
      parent: '<%= moduleName %>',
      url: '/',<% if (secure) {%>
      authenticate: true,
      role: '<%= role %>',<%}%>
      views: {
        '@<%= moduleName %>': {
          templateUrl: '<%= mainHtmlUrl %>',
          controller: '<%= classedName %>MainController',
          controllerAs: 'main'
        }
      }
    };

    $stateProvider.state(mainState);

    mainMenuProvider.addMenuItem({
      name: '<%= menuItem %>',
      state: mainState.name<% if (secure) {%>,
      role: '<%= role %>'<%}%>
    });
  }

})();
