/*
* AngularJS Movie Api Test
*
*/
var configUrl = {
  baseUrl : window.location.origin ? window.location.origin : window.location.protocol + '//' + window.location.hostname + ':' + window.location.port,
  apiUrl: 'http://api.themoviedb.org/3/',
  apiKey: 'API KEY HERE'
};

(function() {
  'use strict'

  angular
    .module('app', ['app.core'])
    .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise("/");

      $stateProvider
        .state('home', {
          url: "/",
          templateUrl: 'views/home.html',
          controller: 'searchController'
        })
        .state('tv', {
          url: "/tv/:id",
          templateUrl: 'views/tv_shows.html',
          controller: 'tvController'
        })
    }
})();
