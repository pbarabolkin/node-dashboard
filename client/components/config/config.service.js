'use strict';

angular.module('dashboardApp')
  .value('Config', {
    apiBaseUrl: location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '') + '/api/'
  });
