'use strict';
app.service('abilityService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/ability").then(
            function (response) {
                return response.data;
            }
        );
    }

}]);