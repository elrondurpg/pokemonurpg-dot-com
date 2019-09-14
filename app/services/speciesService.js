'use strict';
app.service('pokemonService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/pokemon").then(
            function (response) {
                return response.data;
            }
        );
    }

    service.findByName = function(name) {
        return $http.get($rootScope.serviceHost + "/pokemon/" + name).then(
             function (response) {
                return response.data;
             }
        );
    }

}]);