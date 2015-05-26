'use strict';

angular.module('dashboardApp', [
  'ngStorage',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'angularSpinner'
])
  .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    // spinner control
    var numLoadings = 0;
    $httpProvider.interceptors.push(['$q', 'usSpinnerService', function ($q, usSpinnerService) {
      return {
        request: function (config) {
          numLoadings++;

          usSpinnerService.spin('main-spinner');

          return config || $q.when(config);
        },
        response: function (response) {
          if ((--numLoadings) === 0) {
            usSpinnerService.stop('main-spinner');
          }

          return response || $q.when(response);
        },
        responseError: function (response) {
          if (!(--numLoadings)) {
            usSpinnerService.stop('main-spinner');
          }

          return $q.reject(response);
        }
      };
    }]);

    $httpProvider.interceptors.push(['$rootScope', '$q', '$injector', function (scope, $q, $injector) {
      return {
        response: function (response) {
          return response;
        },
        responseError: function (response) {
          var status = response.status;

          switch (status) {
            case 401:
              $injector.invoke(['$state', 'Auth', function ($state, Auth) {
                Auth.logout().then(function (data) {
                  $state.go('login');
                });
              }]);
              break;
            case 403:
              $injector.invoke(['$state', function ($state) {
                $state.go('login', {
                  returnUrl: $state.href($state.current.name, $state.params)
                });
              }]);
              break;
            default :
              console.log('An error occurred during request');
            // TODO: redirect to error page
          }

          return $q.reject(response);
        }
      };
    }]);

    $urlRouterProvider.otherwise('/');

    $locationProvider.hashPrefix('!');
  }])
  .run(['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
    $rootScope.$on("$stateChangeStart", function (event, curr, stateParams) {
      var denied = curr.authenticate && !Auth.isAuthenticated();

      if (denied) {
        // User isn’t authenticated
        $state.go("login", {
          returnUrl: $state.href(curr.name, stateParams),
          manualLogin: false
        });
        event.preventDefault();
      }
    });
  }]);
