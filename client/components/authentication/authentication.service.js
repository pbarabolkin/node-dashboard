'use strict';

angular.module('dashboardApp')
  .service('Auth', ['$http', 'Config', '$localStorage', function ($http, Config, $localStorage) {
    var self = this;

    self.login = function (email, password, remember) {
      var promise = $http.post(Config.apiBaseUrl + 'auth/login', {
        email: email,
        password: password,
        remember: remember
      }).then(function (response) {
        $localStorage.user = response.data;

        return response.data;
      });

      return promise;
    };

    self.isAuthenticated = function () {
      return !!self.getUser();
    };

    self.logout = function () {
      var promise = $http.post(Config.apiBaseUrl + 'auth/logout').then(function (response) {
        delete  $localStorage.user;

        return response.data;
      });

      return promise;
    };

    self.getUser = function () {
      return $localStorage.user;
    };
  }]);
