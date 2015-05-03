'use strict';

angular.module('dashboardApp')
  .controller('LogoutCtrl', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
    Auth.logout().then(function () {
      $state.go('login');
    });
  }]);
