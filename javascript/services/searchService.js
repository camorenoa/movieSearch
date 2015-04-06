/**
* Created by César Moreno
*/

(function(){
  'use strict';

  angular
    .module('app.core')
    .factory('searchService', searchService);

  searchService.$inject = ['$http', '$q'];


  function searchService($http, $q) {

    var self = this;

    self.prod = null;

    var production = function() {
      this.productionList = [];
    }

    production.prototype = {
      add: function(item) {
        this.productionList.push(item);
      },
      contains: function(id) {
        if(id) {
          var currentItem = this.productionList.filter(function(_item){
            return _item.id == id;
          })[0];
          return !!currentItem;
        }
      },
      getItem: function(id) {
        if(id) {
          var currentItem = this.productionList.filter(function(_item){
            return _item.id == id;
          })[0];
          return currentItem;
        }
      }
    }

    var service = {
      doSearch: doSearch,
      movieData: movieData,
      tvData: tvData
    }
    
    return service;

    function doSearch (query, noPage) {
      self.prod = new production();
      return $http({
        method: 'GET',
        url: configUrl.apiUrl + 'search/multi',
        params: {
          api_key: configUrl.apiKey,
          query: query,
          page: noPage
        }
      });
    }

    function movieData (id) {
      var de = $q.defer(); 
      if(!self.prod.contains(id)) {
        return $http({
          method: 'GET',
          url: configUrl.apiUrl + 'movie/'+ id +'/credits',
          params: {
            api_key: configUrl.apiKey
          }
        }).success(function(response){
          self.prod.add(response);
          de.resolve(response);
        }).error(function(error){
          de.reject(error);
        });
      } else {
        de.resolve(self.prod.getItem(id));
      }
      return de.promise;
    }

    function tvData (id) {
      var de = $q.defer(); 
      if(!self.prod.contains(id)) {
        return $http({
          method: 'GET',
          url: configUrl.apiUrl + 'tv/'+ id +'/credits',
          params: {
            api_key: configUrl.apiKey
          }
        }).success(function(response){
          self.prod.add(response);
          de.resolve(response);
        }).error(function(error){
          de.reject(error);
        });
      } else {
        de.resolve(self.prod.getItem(id));
      }
      return de.promise;
    }

  }
})();