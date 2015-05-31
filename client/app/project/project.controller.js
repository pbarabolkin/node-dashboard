'use strict';

angular.module('dashboardApp')
  .controller('ProjectCtrl', ['$scope', '$stateParams', '$q', 'Project', 'Ticket', function ($scope, $stateParams, $q, Project, Ticket) {
    $scope.error = [];
    $scope.project = {
      name: '',
      statuses: [],
      priorities: []
    };
    $scope.tickets = [];

    if ($stateParams.id) {
      $q.all([
        Project.get($stateParams.id),
        Ticket.getTickets($stateParams.id)
      ]).then(function (res) {
        if (res[0] && res[0].errors) {
          $scope.error = $scope.error.concat(res[0].errors);
        } else {
          $scope.project = res[0];
        }

        if (res[1] && res[1].errors) {
          $scope.error = $scope.error.concat(res[1].errors);
        } else {
          $scope.tickets = res[1];
        }

        projectLoaded();
      });
    } else {
      projectLoaded();
    }

    function projectLoaded() {
      $scope.addStatus = function () {
        $scope.project.statuses.push({});
      };

      $scope.removeStatus = function (index) {
        $scope.error = [];
        $scope.success = null;
        if (_.some($scope.tickets, {'statusId': $scope.project.statuses[index]._id})) {
          $scope.error.push('Some tickets use this priority.');
          return;
        }

        $scope.project.statuses.splice(index, 1);
      };

      $scope.addPriority = function () {
        $scope.project.priorities.push({});
      };

      $scope.removePriority = function (index) {
        $scope.project.priorities.splice(index, 1);
      };

      $scope.save = function () {
        $scope.error = [];
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
