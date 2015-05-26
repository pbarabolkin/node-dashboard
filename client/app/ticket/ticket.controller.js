'use strict';

angular.module('dashboardApp')
  .controller('TicketCtrl', ['$scope', '$stateParams', '$q', 'Ticket', 'Project', function ($scope, $stateParams, $q, Ticket, Project) {
    $scope.error = [];
    $scope.ticket = {
      name: '',
      description: '',
      status: {},
      priority: {},
      assigneeId: '',
      projectId: $stateParams.projectId
    };
    $scope.project = {
      name: '',
      statuses: [],
      priorities: []
    };

    // if new ticket
    if (!$stateParams.id) {
      $q.all([
        loadTicket(),
        Project.get($stateParams.projectId)
      ]).then(function (res) {
        if (res[0] && res[0].errors) {
          $scope.error.concat(res[0].errors);
        } else {
          $scope.ticket = res[0];
        }

        if (res[1] && res[1].errors) {
          $scope.error.concat(res[1].errors);
        } else {
          $scope.project = res[1];
        }

        dataLoaded();
      });
    } else {
      // existing ticket

      loadTicket()
        .then(function (result) {
          if (result && result.errors) {
            $scope.error.concat(result.errors);
          } else {
            $scope.ticket = result;
            Project
              .get($scope.ticket.projectId)
              .then(function (result) {
                if (result && result.errors) {
                  $scope.error.concat(result.errors);
                } else {
                  $scope.project = result;
                }

                dataLoaded();
              });
          }
        });
    }

    function loadTicket() {
      var d = $q.defer();

      if ($stateParams.id) {
        Ticket
          .get($stateParams.id)
          .then(function (result) {
            $scope.ticket = result;
            d.resolve(result);
          });
      } else {
        d.resolve({
          name: '',
          description: '',
          status: {},
          priority: {},
          assigneeId: '',
          projectId: $stateParams.projectId
        });
      }

      return d.promise;
    }

    function dataLoaded() {
      $scope.save = function () {
        $scope.error = [];
        $scope.success = null;

        Ticket.save($scope.ticket)
          .then(function (result) {
            if (result && result.errors) {
              $scope.error.concat(result.errors);
            } else {
              $scope.success = result;
            }
          });
      }
    }
  }]);
