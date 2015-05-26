'use strict';

angular.module('dashboardApp')
  .controller('ProjectCtrl', ['$scope', '$stateParams', 'Project', function ($scope, $stateParams, Project) {
    if ($stateParams.id) {
      Project
        .get($stateParams.id)
        .then(function (result) {
          $scope.project = result;
          projectLoaded();
        });
    } else {
      $scope.project = {
        name: '',
        statuses: [],
        priorities: []
      };
      projectLoaded();
    }

    function projectLoaded() {
      $scope.addStatus = function () {
        $scope.project.statuses.push({});
      };

      $scope.removeStatus = function (index) {
        $scope.project.statuses.splice(index, 1);
      };

      $scope.addPriority = function () {
        $scope.project.priorities.push({});
      };

      $scope.removePriority = function (index) {
        $scope.project.priorities.splice(index, 1);
      };

      $scope.save = function () {
        $scope.error = null;
        $scope.success = null;

        Project.save($scope.project)
          .then(function (result) {
            if (result && result.errors) {
              $scope.error = result.errors;
            } else {
              $scope.success = result;
            }
          });
      }
    }
  }]);
