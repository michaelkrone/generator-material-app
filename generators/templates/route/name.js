(function () {
  'use strict';

  /**
   * Introduce the <%= scriptAppName %>.<%= moduleName %> module
   * and configure it.
   *
   * @requires ui.router<% children.forEach(function(child) { %>
   * @requires <%= scriptAppName %>.<%= child %><% }); %>
   */
  angular
    .module('<%= scriptAppName %>.<%= moduleName %>', [<% children.forEach(function(child) { %>
      '<%= scriptAppName %>.<%= child %>',<% }); %>
      'ui.router'
    ])
    .config(config<%= classedName %>Route);

  // inject config<%= classedName %>Route dependencies
  config<%= classedName %>Route.$inject = ['$stateProvider'];

  // route config function configuring the passed $stateProvider
  function config<%= classedName %>Route($stateProvider) {
    $stateProvider
      .state('<%= name %>', {
        url: '<%= route %>',<% if (isSubRoute && ancestors.length) { %>
        parent: '<%= ancestors.join('.') %>',<% } %><% if(autoRoute) { %>
        abstract: true,<% } %>
        templateUrl: '<%= htmlUrl %>',
        controller: '<%= classedName %>Controller',
        controllerAs: 'vm'
    });
  }

})();
