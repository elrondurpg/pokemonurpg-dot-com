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

    service.createSpecies = function(payload) {
        return userService.sendAuthenticatedRequest("POST", $rootScope.serviceHost + "/pokemon/", payload)
        .success(
            function (response) {
                return response;
            }
        )
        .error(
            function(response) {
                return response;
            }
        );
    }

    service.updateSpecies = function(payload) {
        return userService.sendAuthenticatedRequest("PUT", $rootScope.serviceHost + "/pokemon/", payload)
        .success(
            function (response) {
                return response;
            }
        )
        .error(
            function(response) {
                return response;
            }
        );
    }

}]);