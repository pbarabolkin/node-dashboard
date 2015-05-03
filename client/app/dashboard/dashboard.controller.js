'use strict';

angular.module('dashboardApp')
    .controller('DashboardCtrl', function ($scope, $http) {
        $scope.awesomeThings = [];

        $http.get('/api/dashboard').success(function (awesomeThings) {
            $scope.awesomeThings = awesomeThings;
        });

    });
