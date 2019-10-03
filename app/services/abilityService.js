'use strict';
app.service('abilityService', ['userService', '$http', '$rootScope', function(userService, $http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/ability").then(
            function (response) {
                return response.data;
            }
        );
    }

    service.findByName = function(name) {
        return $http.get($rootScope.serviceHost + "/ability/" + name).then(
             function (response) {
                return response.data;
             }
        );
    }

    service.createAbility = function(payload) {
        return userService.sendAuthenticatedRequest("POST", $rootScope.serviceHost + "/ability/", payload).then(
            function (response) {
                return response.data;
            }
        );
    }

    service.updateAbility = function(payload) {
        return userService.sendAuthenticatedRequest("PUT", $rootScope.serviceHost + "/ability/", payload).then(
            function (response) {
                return response.data;
            }
        );
    }
}]);