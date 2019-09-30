'use strict';
app.service('pokemonService', ['userService', '$http', '$rootScope', function(userService, $http, $rootScope){

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

    service.updateSpecies = function(payload) {
        var request = userService.buildAuthenticatedRequest(payload);
        console.log(request);
        return $http.put($rootScope.serviceHost + "/pokemon/", request).then(
            function (response) {
                return response.data;
            }
        );
    }

}]);