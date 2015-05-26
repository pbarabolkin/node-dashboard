'use strict';

angular.module('dashboardApp')
  .controller('DashboardCtrl', ['$scope', 'Project', function ($scope, Project) {
    $scope.projects = [];

    Project
      .getProjects()
      .then(function (result) {
        if (result && result.errors) {
          $scope.error = result.errors;
        } else {
          $scope.projects = result;
        }
      });
  }]);
