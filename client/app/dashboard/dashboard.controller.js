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

        $scope.removeProject = function (id, index) {
          if (confirm("Are you sure you want to delete this project?")) {
            Project.remove(id).then(function (result) {
              if (result && result.errors) {
                $scope.error = result.errors;
              } else {
                $scope.projects.splice(index, 1);
              }
            });
          }
        };
      });
  }]);
