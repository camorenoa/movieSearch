/**
* Created by César Moreno
*/

(function(){
  'use strict';

  angular
    .module('app.core')
    .controller('searchController', searchController);

  searchController.$inject = ['$scope', '$state', 'searchService', 'apiConfigService'];

  function searchController($scope, $state, searchService, apiConfigService) {
    var sa = this;
    var newQuery = '';
    var noPage = 1;
    var totalPages;

    $scope.searchResults = [];
    $scope.noMoreResults = null;
    $scope.loadMoreIcon = false;

    apiConfigService.apiConfiguration()
      .then(function (response) {
        $scope.configImages = response.data.images;
      }, function(error){
        console.error(error);
      });

    $scope.sendSearch = function (newValue) {
      newQuery = newValue;
      noPage = 1;
      $scope.searchResults = [];
      $scope.noMoreResults = null;
      searchService.doSearch(newValue, noPage)
        .then(function (response) {
          console.log('response', response );
          totalPages = response.data.total_pages;
          $scope.results = response.data.results;
          console.log('results.backdrop_path', $scope.results);
          for (var i = 0; i < $scope.results.length; i++) {
            if($scope.results[i].media_type != 'person') {
              $scope.searchResults.push($scope.results[i]);           
            }
          }
          noPage += 1;
        }, function (error) {
          console.error(error);
        });
    }

    $scope.loadMore = function () {
      if(noPage <= totalPages && !$scope.loadMoreIcon) {
      console.log('noPage', noPage, totalPages);
        $scope.loadMoreIcon = true;
        searchService.doSearch(newQuery, noPage)
          .then(function (response) {
            $scope.results = response.data.results;
            for (var i = 0; i < $scope.results.length; i++) {
              if($scope.results[i].media_type != 'person') {
                $scope.searchResults.push($scope.results[i]);
              }
            }
            $scope.loadMoreIcon = false;
            noPage += 1;
          }, function (error) {
            console.error(error);
          });
      } else if(noPage > totalPages){
        $scope.noMoreResults = 'No hay más resultados para este criterio de busqueda';
      }
    }

    $scope.creditsData = function(dataId, dataType) {
      if(dataType == 'movie') {
        searchService.movieData(dataId)
          .then(function(response) {
            $scope.cast = response;
          })
          .catch(function(error){
            console.error(error); 
          });
      } else if(dataType == 'tv') {
        searchService.tvData(dataId)
          .then(function(response) {
            $scope.cast = response;
          })
          .catch(function(error){
            console.error(error); 
          });
      }
    }

    $scope.linkItem = function (idItem, typeMedia) {
      console.log('idItem', idItem, typeMedia);
      if(typeMedia === 'tv') {
        $state.go('tv', {id: idItem});
      }
    }
  }
})();