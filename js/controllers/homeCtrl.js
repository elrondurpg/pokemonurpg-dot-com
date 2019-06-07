'use strict';

app.controller('homeCtrl', ['$scope', 'loginService', 'sessionService', '$location', function($scope, loginService, sessionService, $location){
    $scope.home = $scope;
	$scope.txt='Page Home';
	$scope.logout=function(){
		loginService.logout();
	}
    
    var ctrl = this;

    
}]);