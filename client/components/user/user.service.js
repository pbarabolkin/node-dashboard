'use strict';

angular.module('dashboardApp')
  .service('User', ['$http', 'Config', function ($http, Config) {
    var self = this;

    self.getUsers = function () {
      var promise = $http.get(Config.apiBaseUrl + 'user').then(function (response) {
        return response.data;
      }, function (response) {
        return {
          errors: response.data
        };
      });

      return promise;
    };
  }]);
