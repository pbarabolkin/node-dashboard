'use strict';

angular.module('dashboardApp')
  .service('Project', ['$http', 'Config', function ($http, Config) {
    var self = this;

    self.getProjects = function () {
      var promise = $http
        .get(Config.apiBaseUrl + 'project')
        .then(function (response) {
          return response.data;
        }, function (response) {
          return {
            errors: response.data
          };
        });

      return promise;
    };

    self.get = function (id) {
      var promise = $http
        .get(Config.apiBaseUrl + 'project/' + id)
        .then(function (response) {
          return response.data;
        }, function (response) {
          return {
            errors: response.data
          };
        });

      return promise;
    };

    self.save = function (project) {
      var promise = $http
        .post(Config.apiBaseUrl + 'project', project)
        .then(function (response) {
          return response.data;
        }, function (response) {
          return {
            errors: response.data
          };
        });

      return promise;
    };

    self.remove = function (id) {
      var promise = $http
        .delete(Config.apiBaseUrl + 'project/' + id)
        .then(function (response) {
          return response.data;
        }, function (response) {
          return {
            errors: response.data
          };
        });

      return promise;
    };
  }]);
