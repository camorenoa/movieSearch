/**
* Created by César Moreno
*/

(function(){
  'use strict';

  angular
    .module('app.core')
    .directive('scrolled', scrolled);

  scrolled.$inject = ['$window'];

  function scrolled($window){
    return function(scope, elm, attr) {
        var raw = elm[0];
        angular.element($window).on('scroll', function() {
          if (angular.element($window).scrollTop() + angular.element($window).height() >= raw.scrollHeight) {
            scope.$apply(attr.scrolled);
          }
        });
      };
  }
})();