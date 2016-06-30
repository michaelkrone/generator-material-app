(function () {
  'use strict';

  // register the directive as remoteUnique
  angular
    .module('<%= scriptAppName %>.remoteUnique', [])
    .directive('remoteUnique', RemoteUnique);

  // add RemoteUnique dependencies to inject
  RemoteUnique.$inject = ['$injector'];

  /**
   * RemoteUnique directive
   */
  function RemoteUnique($injector) {
    // directive definition members
    var directive = {
      require: 'ngModel',
      restrict: 'A',
      link: link
    };

    return directive;

    // directives link definition
    function link(scope, element, attrs, ctrl) {
      if (!attrs.remoteUnique) return;

      var service = $injector.get(attrs.remoteUnique);
      var ignore;

      attrs.$observe('remoteUniqueIgnore', function (newValue) {
        ignore = newValue;
      });

      ctrl.$parsers.unshift(validateRemoteUnique);
      ctrl.$formatters.unshift(validateRemoteUnique);

      function validateRemoteUnique(viewValue) {
        var criteria = {};

        if (viewValue === ignore) {
          ctrl.$setValidity('remote-unique', true);
          return viewValue;
        }

        criteria[ctrl.$name] = viewValue;

        service.query(criteria, function (result) {
          ctrl.$setValidity('remote-unique', viewValue === ignore || !result.length);
        });

        return viewValue;
      }
    }
  }
})();
