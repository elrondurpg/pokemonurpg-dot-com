'use strict';

app.controller('infoCtrl', ['$scope','loginService', 'sessionService', '$location', function ($scope, loginService, sessionService, $location) {
    
    var ctrl = this;
      
    var path = $location.$$path;
    var regex = path.match(/^\/info\/(.*)$/);
    if (regex === null)
    	ctrl.page = "/partials/info/info-home.html";
    else
    {
    	var str = regex[1];
		if (str.charAt(str.length-1) == '/')
			str = str.substring(0, str.length - 1);
		var dirs = [ 'general', 'battles', 'art', 'contests', 'onmyo-region', 'park', 'stories' ];
		if (dirs.includes(str))
			return '/partials/info/info-home.html';
    	
    	ctrl.page = "/partials/info/" + str + ".html";
    	
    }

}]);