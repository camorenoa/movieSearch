/**
* Created by César Moreno
*/

(function(){
  'use strict';

  angular
    .module('app.core')
    .controller('tvController', tvController);

  tvController.$inject = ['$scope', '$stateParams', 'tvService', 'apiConfigService'];

  function tvController($scope, $stateParams, tvService, apiConfigService) {
    var idTv = $stateParams.id;
    // console.log("$stateParams", idTv);
    $scope.seasonsResults = [];

    apiConfigService.apiConfiguration()
      .then(function (response) {
        $scope.configImages = response.data.images;
      }, function(error){
        console.error(error);
      });

    $scope.seasonsLoad = function (seasonId, seasonNumber) {
      tvService.tvSeasons(seasonId, seasonNumber)
        .then(function (response) {
          // console.log('seasonsResults', response);
          $scope.seasonsResultsData = response.data;
          $scope.seasonsResults.push($scope.seasonsResultsData);
          console.log('seasonsResults', $scope.seasonsResults);
        }, function(error){
          console.error(error);
        });
    }

    tvService.tvShows(idTv)
      .then(function (response) {
        // console.log('response', response);
        $scope.results = response.data;
        for(var i = 0; i < $scope.results.seasons.length; i++) {
          $scope.seasonsLoad(idTv, $scope.results.seasons[i].season_number);
        }
      }, function(error){
        console.error(error);
      });
  }
})();