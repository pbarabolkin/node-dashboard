'use strict';

angular.module('dashboardApp')
  .controller('TicketCtrl', ['$scope', '$stateParams', '$q', '$state', 'Ticket', 'Project', 'User', function ($scope, $stateParams, $q, $state, Ticket, Project, User) {
    $scope.error = [];
    $scope.ticket = {
      name: '',
      description: '',
      order: 0,
      statusId: '',
      priorityId: '',
      _assignee: {},
      projectId: $stateParams.projectId
    };
    $scope.project = {
      name: '',
      statuses: [],
      priorities: []
    };
    $scope.users = [];

    // if new ticket
    if (!$stateParams.id) {
      $q.all([
        loadTicket(),
        Project.get($stateParams.projectId),
        User.getUsers()
      ]).then(function (res) {
        if (res[0] && res[0].errors) {
          $scope.error = $scope.error.concat(res[0].errors);
        } else {
          $scope.ticket = res[0];
        }

        if (res[1] && res[1].errors) {
          $scope.error = $scope.error.concat(res[1].errors);
        } else {
          $scope.project = res[1];
        }

        if (res[2] && res[2].errors) {
          $scope.error = $scope.error.concat(res[2].errors);
        } else {
          $scope.users = res[2];
        }

        dataLoaded();
      });
    } else {
      // existing ticket

      $q.all([
        loadTicket(),
        User.getUsers()
      ]).then(function (res) {
        if (res[0] && res[0].errors) {
          $scope.error = $scope.error.concat(res[0].errors);
        } else {
          $scope.ticket = res[0];
        }

        if (res[1] && res[1].errors) {
          $scope.error = $scope.error.concat(res[1].errors);
        } else {
          $scope.users = res[1];
        }

        if ($scope.error.length)
          return;

        Project
          .get($scope.ticket.projectId)
          .then(function (result) {
            if (result && result.errors) {
              $scope.error = $scope.error.concat(result.errors);
            } else {
              $scope.project = result;
            }

            dataLoaded();
          });
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
          order: 0,
          statusId: '',
          priorityId: '',
          _assignee: {},
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
              $scope.error = $scope.error.concat(result.errors);
            } else {
              $scope.success = result;
            }
          });
      };

      $scope.remove = function (id) {
        if (confirm("Are you sure you want to delete this ticket?")) {
          Ticket.remove(id).then(function (result) {
            if (result && result.errors) {
              $scope.error = result.errors;
            } else {
              $state.go('board', {id: $scope.ticket.projectId});
            }
          });
        }
      };
    }
  }]);
