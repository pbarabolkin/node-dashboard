'use strict';

angular.module('dashboardApp')
  .controller('BoardCtrl', ['$scope', '$stateParams', '$q', 'Project', 'Ticket', function ($scope, $stateParams, $q, Project, Ticket) {
    $scope.error = [];
    $scope.project = {};
    $scope.groupedTickets = {};

    $q.all([
      Project.get($stateParams.id),
      Ticket.getTickets($stateParams.id)
    ]).then(function (res) {
      if (res[0] && res[0].errors) {
        $scope.error.concat(res[0].errors);
      } else {
        $scope.project = res[0];
      }

      var tickets = [];

      if (res[1] && res[1].errors) {
        $scope.error.concat(res[1].errors);
      } else {
        tickets = res[1];
      }

      _($scope.project.statuses).forEach(function (item, i) {
        $scope.groupedTickets[item._id] = _.where(tickets, {'statusId': item._id});
      });

      var indexInColumnToMove;
      var statusIdToChange;
      $scope.dropCallback = function (event, index, item, external, type, allowedType) {
        statusIdToChange = allowedType;

        // order in the same column
        if (item.statusId === statusIdToChange) {
          var prevIndex = $scope.groupedTickets[statusIdToChange].indexOf(_.find($scope.groupedTickets[statusIdToChange], function (it) {
            return it._id === item._id;
          }));

          indexInColumnToMove = index > prevIndex ? index - 1 : index;
        } else {
          indexInColumnToMove = index;
        }

        return item;
      };

      $scope.ticketMoved = function (itemToMove) {
        var index = $scope.groupedTickets[itemToMove.statusId].indexOf(itemToMove);
        $scope.groupedTickets[itemToMove.statusId].splice(index, 1);

        $scope.groupedTickets[statusIdToChange].splice(indexInColumnToMove, 0, itemToMove);

        itemToMove.statusId = statusIdToChange;

        var itemsToSave = [];
        _.forEach($scope.groupedTickets, function (val, key) {
          _(val).forEach(function (item, i) {
            item.order = i;
            itemsToSave.push({
              _id: item._id,
              statusId: item.statusId,
              order: item.order
            });
          });
        });

        Ticket.updateOrders(itemsToSave);
      };
    });
  }]);
