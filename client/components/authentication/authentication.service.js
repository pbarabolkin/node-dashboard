'use strict';

angular.module('dashboardApp')
  .service('Auth', ['$http', 'Config', '$localStorage', function ($http, Config, $localStorage) {
    var self = this;

    self.login = function (loginVm) {
      var promise = $http.post(Config.apiBaseUrl + 'auth/login', loginVm).then(function (response) {
        $localStorage.user = response.data;

        return response.data;
      }, function (response) {
        return {
          errors: response.data
        };
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

    self.signup = function (signupVm) {
      var promise = $http.post(Config.apiBaseUrl + 'auth/signup', signupVm).then(function (response) {
        return response.data;
      }, function (response) {
        return {
          errors: response.data
        };
      });

      return promise;
    };
  }]);
