'use strict';

app.controller('loginCtrl', ['$scope','loginService', 'sessionService', '$location', function ($scope,loginService, sessionService, $location) {
    
    var ctrl = this;
    
	$scope.msgtxt='';
	$scope.login=function(data){
		loginService.login(data,$scope); //call login service
	};
    $scope.test=function() {
        loginService.test();
    };
}]);