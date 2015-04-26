'use strict';

angular.module('dashboardApp')
    .service('Auth', ['$http', 'Config', function ($http, Config) {
        var self = this,
            userCookieKey = 'USER';

        self.login = function (email, password, remember) {
            var promise = $http.post(Config.apiBaseUrl + 'auth/login', {
                email: email,
                password: password,
                remember: remember
            }).then(function (response) {
                return response.data;
            });

            return promise;
        };

        self.isAuthenticated = function () {
            return !!self.getUser();
        };

        self.logoutAsync = function () {
            var promise = $http.post(Config.apiBaseUrl + 'auth/logout').then(function (response) {
                return response.data;
            });

            return promise;
        };

        self.getUser = function () {
            return $.cookie(userCookieKey);
        };
    }]);
