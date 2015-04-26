'use strict';

angular.module('dashboardApp')
    .directive('appMenu', ['$rootScope', '$state', 'Auth', function ($rootScope, $state, Auth) {
        return {
            restrict: 'E',
            templateUrl: 'components/app-menu/app-menu.html',
            link: function (scope, elem, attrs) {
                var $menu = $(elem),
                    $navItems = $menu.find('.nav-item'),
                    $html = $('html'),
                    $navigationWrapper = $('.navigation-wrapper'),
                    className = 'active';

                var updateNavs = function () {
                    var stateName = $state.current.name;

                    $navItems.removeClass(className);
                    $navItems.each(function () {
                        var $navItem = $(this),
                            $navLink = $navItem.children('a');

                        if (stateName.indexOf($navLink.attr('ui-sref')) !== -1) {
                            $navItem.addClass(className);
                            return false;
                        }
                    });

                    scope.isAuthenticated = Auth.isAuthenticated();
                };

                scope.isCollapsed = true;

                $rootScope.$on('$stateChangeSuccess', function (event, curr, stateParams) {
                    updateNavs();
                });
            }
        };
    }]);