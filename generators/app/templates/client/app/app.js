/**
 * @ngdoc overview
 * @name <%= scriptAppName %>
 * @description
 * Module definition for the <%= scriptAppName %> module.
 */

(function () {
  'use strict';

  angular
    .module('<%= scriptAppName %>', [<% angularModules.forEach(function(angularModule) { %>
      '<%= angularModule %>',<% }); %>
      // Add modules below
    ])
    .config(appConfig)<% if(features.auth) { %>
    .run(appRun)<% } %>;

  /* App configuration */

  // add appConfig dependencies to inject
  appConfig.$inject = ['$urlRouterProvider', '$urlMatcherFactoryProvider', '$locationProvider', '$mdThemingProvider', '$mdIconProvider'<% if (features.auth) { %>, '$httpProvider'<% } %>];

  /**
   * Application config function
   *
   * @param $stateProvider
   * @param $urlRouterProvider
   * @param $locationProvider
   */
  function appConfig($urlRouterProvider, $urlMatcherFactoryProvider, $locationProvider, $mdThemingProvider, $mdIconProvider<% if (features.auth) { %>, $httpProvider<% } %>) {
    $urlRouterProvider.otherwise('/');
    $urlMatcherFactoryProvider.strictMode(false);
    $locationProvider.html5Mode(true);

    $httpProvider.defaults.transformResponse.push(convertDateStringsToDates);
  <% if(features.auth) { %>
    $httpProvider.interceptors.push('AuthInterceptor');<% } %>


    // set the default palette name
    var defaultPalette = 'blue';
    // define a palette to darken the background of components
    var greyBackgroundMap = $mdThemingProvider.extendPalette(defaultPalette, {'A100': 'fafafa'});

    $mdThemingProvider.definePalette('grey-background', greyBackgroundMap);
    $mdThemingProvider.setDefaultTheme(defaultPalette);

    // customize the theme
    $mdThemingProvider
      .theme(defaultPalette)
      .primaryPalette(defaultPalette)
      .accentPalette('pink')
      .backgroundPalette('grey-background');

    var spritePath = 'bower_components/material-design-icons/sprites/svg-sprite/';
    $mdIconProvider.iconSet('navigation', spritePath + 'svg-sprite-navigation.svg');
    $mdIconProvider.iconSet('action', spritePath + 'svg-sprite-action.svg');
    $mdIconProvider.iconSet('content', spritePath + 'svg-sprite-content.svg');
    $mdIconProvider.iconSet('toggle', spritePath + 'svg-sprite-toggle.svg');
    $mdIconProvider.iconSet('alert', spritePath + 'svg-sprite-alert.svg');
  }<% if(features.auth) { %>

  /* App run bootstrap */

  // add appConfig dependencies to inject
  appRun.$inject = ['$rootScope', '$location', 'Auth'];

  /**
   * Application run function
   *
   * @param $rootScope
   * @param $location
   * @param Auth
   */
  function appRun($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      if (!next.authenticate) {
        return;
      }

      Auth.isLoggedInAsync(function (loggedIn) {
        if (!loggedIn || next.role && !Auth.hasRole(next.role)) {
          $location.path('/login');
        }
      });
    });
  }<% } %>;

  var regexIso8601 = /^(\d{4}|\+\d{6})(?:-(\d{2})(?:-(\d{2})(?:T(\d{2}):(\d{2}):(\d{2})\.(\d{1,})(Z|([\-+])(\d{2}):(\d{2}))?)?)?)?$/;
  function convertDateStringsToDates(input) {
    // Ignore things that aren't objects.
    if (typeof input !== "object") return input;

    for (var key in input) {
      if (!input.hasOwnProperty(key)) continue;

      var value = input[key];
      var match;
      // Check for string properties which look like dates.
      if (typeof value === "string" && (match = value.match(regexIso8601))) {
        var milliseconds = Date.parse(match[0])
        if (!isNaN(milliseconds)) {
          input[key] = new Date(milliseconds);
        }
      } else if (typeof value === "object") {
        // Recurse into object
        convertDateStringsToDates(value);
      }
    }
    return input;
  }

})();
