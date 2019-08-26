'use strict';
// Declare app level module which depends on filters, and services
var app= angular.module('urpg-infohub', ['ngRoute']);

app.directive('siteHeader', function() {
   return {
       restrict: 'E',
       templateUrl: "/site-header.html"
   };
});

//set the configuration
app.directive('siteFooter', function() {
   return {
       restrict: 'E', 
       templateUrl: "/site-footer.html"
   };
});


app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {  
    $locationProvider.html5Mode({
    	enabled: true,
    	requireBase: false
    });
}]);

//
app.run(function($rootScope, $location){
	var routespermission=['/home'];  //route that require login
	
	$rootScope.webHost = "https://pokemonurpg.com";
	$rootScope.serviceHost = "http://localhost:8080";
	
	$rootScope.spriteBase = "https://pokemonurpg.com/img/sprites/";
	$rootScope.iconBase = "https://pokemonurpg.com/img/icons/";
	$rootScope.modelBase = "https://pokemonurpg.com/img/models/";

	$rootScope.numSpecies = 807;
	$rootScope.numGenerations = 7;

	$rootScope.dashExceptions = ["nidoran-f", "nidoran-m", "ho-oh", "meowstic-m", "basculin-red-striped", "unown-a", "porygon-z" ];
	
	/*$rootScope.logout=function(){
		loginService.logout();
	}
	
	$rootScope.sessionService = sessionService;
	$rootScope.location = $location;
	
    sessionService.username = "";
    var connected = loginService.islogged();
    connected.then(function(msg) {
    	//console.log(msg);
        if (msg.data.username == "")
        {
            sessionService.username = "";
            sessionService.role = "";
            sessionService.loginString = "";
            sessionService.id = "";
            if( routespermission.indexOf($location.path()) !=-1)
	        {
            	$window.location.assign('/login'); 
            }
        }
        else
        {
            sessionService.username = msg.data.username;
            sessionService.role = msg.data.role;
            sessionService.loginString = msg.data.loginString;
            sessionService.id = msg.data.id;
        }
    });*/
}); // */
