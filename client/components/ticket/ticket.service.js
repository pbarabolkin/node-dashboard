'use strict';

angular.module('dashboardApp')
  .service('Ticket', ['$http', 'Config', function ($http, Config) {
    var self = this;

    self.getTickets = function (projectId) {
      var promise = $http
        .get(Config.apiBaseUrl + 'ticket/project/' + projectId)
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
        .get(Config.apiBaseUrl + 'ticket/' + id)
        .then(function (response) {
          return response.data;
        }, function (response) {
          return {
            errors: response.data
          };
        });

      return promise;
    };

    self.save = function (ticket) {
      var promise = $http
        .post(Config.apiBaseUrl + 'ticket', ticket)
        .then(function (response) {
          return response.data;
        }, function (response) {
          return {
            errors: response.data
          };
        });

      return promise;
    };

    self.updateOrders = function (tickets) {
      var promise = $http
        .post(Config.apiBaseUrl + 'ticket/updateOrders', tickets)
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
