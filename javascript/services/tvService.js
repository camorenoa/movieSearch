/**
* Created by César Moreno
*/

(function(){
  'use strict';

  angular
    .module('app.core')
    .factory('tvService', tvService);

  tvService.$inject = ['$http', '$q'];

  function tvService($http, $q) {
  	var service = {
      tvShows: tvShows,
      tvSeasons: tvSeasons
    }
    
    return service;


    function tvShows(idTv) {
      return $http({
        method: 'GET',
        url: configUrl.apiUrl + 'tv/' + idTv,
        params: {
          api_key: configUrl.apiKey
        }
      });
    }
    function tvSeasons(seasonId, seasonNumber) {
      return $http({
        method: 'GET',
        url: configUrl.apiUrl + 'tv/' + seasonId + '/season/' + seasonNumber,
        params: {
          api_key: configUrl.apiKey
        }
      });
    }
  }
})();
  