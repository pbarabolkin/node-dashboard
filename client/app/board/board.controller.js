'use strict';

angular.module('dashboardApp')
  .controller('BoardCtrl', ['$scope', '$stateParams', '$q', 'Project', 'Ticket', function ($scope, $stateParams, $q, Project, Ticket) {
    $scope.error = [];
    $scope.project = {};
    $scope.tickets = [];

    $q.all([
      Project.get($stateParams.id),
      Ticket.getTickets($stateParams.id)
    ]).then(function (res) {
      if (res[0] && res[0].errors) {
        $scope.error.concat(res[0].errors);
      } else {
        $scope.project = res[0];
      }

      if (res[1] && res[1].errors) {
        $scope.error.concat(res[1].errors);
      } else {
        $scope.tickets = res[1];
      }
    });
  }]);
