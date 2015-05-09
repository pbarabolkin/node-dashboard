'use strict';

angular.module('dashboardApp')
  .controller('LoginCtrl', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
    $scope.email = '';
    $scope.password = '';
    $scope.remember = false;
    $scope.error = '';

    $scope.doLogin = function () {
      Auth.login({
        email: $scope.email,
        password: $scope.password,
        remember: $scope.remember
      }).then(function (result) {
        if (result && result.errors) {
          $scope.error = result.errors;
        } else {
          $state.go('dashboard');
        }
      });
    };
  }]);
