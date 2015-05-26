'use strict';

angular.module('dashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('ticket', {
        url: '/ticket?id&projectId',
        templateUrl: 'app/ticket/ticket.html',
        controller: 'TicketCtrl'
      });
  });
