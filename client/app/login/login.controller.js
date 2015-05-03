'use strict';

angular.module('dashboardApp')
  .controller('LoginCtrl', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
    $scope.email = '';
    $scope.password = '';
    $scope.remember = false;
    $scope.error = '';

    $scope.doLogin = function () {
      Auth.login($scope.email, $scope.password, $scope.remember).then(function (result) {
        if (result && result.error) {
          $scope.error = result.error;
        } else {
          $state.go('dashboard');
        }
      });
    };
  }]);
