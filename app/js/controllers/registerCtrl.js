'use strict';

app.controller('registerCtrl', ['registerService', 'sessionService', '$location', '$scope', '$http', '$rootScope', function (registerService, sessionService, $location, $scope, $http, $rootScope) {
    var ctrl = this;
    ctrl.starterNames = {};
    
    $http.get($rootScope.serviceHost + '/pokemon/starters').success(function (data) {
        ctrl.starterNames = data;
    });
    
    $scope.register=function(data){
    	//call registration service
		registerService.register(data,$scope);
	};
    
}]);