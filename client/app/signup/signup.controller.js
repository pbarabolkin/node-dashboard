'use strict';

angular.module('dashboardApp')
  .controller('SignupCtrl', ['$scope', '$state', 'Auth', function ($scope, $state, Auth) {
    $scope.email = '';
    $scope.fName = '';
    $scope.lName = '';
    $scope.password = '';
    $scope.cPassword = '';
    $scope.error = '';

    $scope.doSignup = function () {
      Auth.signup({
        email: $scope.email,
        fName: $scope.fName,
        lName: $scope.lName,
        password: $scope.password,
        cPassword: $scope.cPassword
      }).then(function (result) {
        if (result && result.errors) {
          $scope.error = result.errors;
        } else {
          $state.go('login');
        }
      });
    };
  }]);
