'use strict';
app.service('attackService', ['userService', '$http', '$rootScope', function(userService, $http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/attack").then(
            function (response) {
                return response.data;
            }
        );
    }

    service.findByName = function(name) {
        return $http.get($rootScope.serviceHost + "/attack/" + name).then(
             function (response) {
                return response.data;
             }
        );
    }

    service.createAttack = function(payload) {
        return userService.sendAuthenticatedRequest("POST", $rootScope.serviceHost + "/attack/", payload)
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

    service.updateAttack = function(payload) {
        return userService.sendAuthenticatedRequest("PUT", $rootScope.serviceHost + "/attack/", payload)
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