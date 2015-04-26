'use strict';

angular.module('dashboardApp')
    .controller('LoginCtrl', ['$scope', 'Auth', function ($scope, Auth) {
        $scope.email = '';
        $scope.password = '';
        $scope.remember = false;

        $scope.doLogin = function () {
            Auth.login($scope.email, $scope.password, $scope.remember);
        };
    }]);