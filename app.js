'use strict';

var app= angular.module('urpg-infohub', ['ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
  .when("/pokemon/:name", {
    templateUrl : "/pokemonurpg-dot-com/ultradex/ultradex.component.html"
  })
  .when("/stats/:name", {
    templateUrl : "/pokemonurpg-dot-com/stats/stats.component.html"
  })
  .when("/resources", {
    templateUrl : "/pokemonurpg-dot-com/resources/resources.component.html"
  })
  .when("/resources/:page", {
    templateUrl : function(params){
        return "/pokemonurpg-dot-com/resources/resources-" + params.page + ".component.html";
    }
  })
  .otherwise({
    templateUrl : "/pokemonurpg-dot-com/dashboard/dashboard.component.html"
  })
});

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
    	enabled: true,
    	requireBase: false
    });
}]);

app.directive('siteHeader', function() {
   return {
       restrict: 'E',
       templateUrl: "/pokemonurpg-dot-com/site-header/site-header.component.html"
   };
});

app.directive('siteFooter', function() {
   return {
       restrict: 'E', 
       templateUrl: "/pokemonurpg-dot-com/site-footer.html"
   };
});

app.run(function($rootScope, $location, $anchorScroll) {
    $rootScope.debug = true;
    $rootScope.title = "Pokemon URPG Infohub";
	$rootScope.webHost = "https://pokemonurpg.com";
	$rootScope.serviceHost = "http://localhost:8080";

	$rootScope.imageBase = "https://pokemonurpg.com/img";
	$rootScope.spriteBase = $rootScope.imageBase + "/sprites/";
	$rootScope.iconBase = $rootScope.imageBase + "/icons/";
	$rootScope.modelBase = $rootScope.imageBase + "/models/";

	$rootScope.numSpecies = 807;
	$rootScope.numGenerations = 7;

	$rootScope.dashExceptions = ["nidoran-f", "nidoran-m", "ho-oh", "meowstic-m", "basculin-red-striped", "unown-a", "porygon-z" ];

	$rootScope.$on('$routeChangeSuccess', function(newRoute, oldRoute) {
        if($location.hash()) $anchorScroll();
    });
});
