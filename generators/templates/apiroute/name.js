(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.<%= moduleName %> module
   * and configure it.
   *
   * @requires ui.router
   * @requires ngResource
   * @requires <%= scriptAppName %>.<%= moduleName %>.main
   * @requires <%= scriptAppName %>.<%= moduleName %>.list
   * @requires <%= scriptAppName %>.<%= moduleName %>.create
   */
  angular
    .module('<%= scriptAppName %>.<%= moduleName %>', [
      'ngResource',
      'ui.router',
      '<%= scriptAppName %>.<%= moduleName %>.main',
      '<%= scriptAppName %>.<%= moduleName %>.list',
      '<%= scriptAppName %>.<%= moduleName %>.create'
    ])
    .config(config<%= classedName %>Routes);

  // inject config<%= classedName %>Routes dependencies
  config<%= classedName %>Routes.$inject = ['$urlRouterProvider', '$stateProvider'];

  /**
   * Route configuration function configuring the passed $stateProvider.
   * Register the abstract <%= moduleName %> state with the <%= moduleName %> template
   * paired with the <%= classedName %>Controller as 'index'.
   * The injectable '<%= cameledName %>s' is resolved as a list of all <%= cameledName %>s
   * and can be injected in all sub controllers.
   *
   * @param {$stateProvider} $stateProvider - The state provider to configure
   */
  function config<%= classedName %>Routes($urlRouterProvider, $stateProvider) {
    // The <%= moduleName %> state configuration
    var <%= cameledName %>State = {
      name: '<%= name %>',<% if (isSubRoute && ancestors.length) { %>
      parent: '<%= ancestors.join('.') %>',<% } %>
      url: '<%= route %>',
      abstract: true,
      templateUrl: '<%= htmlUrl %>',
      controller: '<%= classedName %>Controller',
      controllerAs: 'index'
    };

    $urlRouterProvider.when('/<%= slashedName %>', '/<%= slashedName %>/');
    $stateProvider.state(<%= cameledName %>State);
  }

})();
