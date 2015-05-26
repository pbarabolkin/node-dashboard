'use strict';

angular.module('dashboardApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('board', {
        url: '/board/:id',
        templateUrl: 'app/board/board.html',
        controller: 'BoardCtrl'
      });
  });
