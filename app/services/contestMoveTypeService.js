'use strict';
app.service('contestMoveTypeService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findAllRSE = function() {
        return $http.get($rootScope.serviceHost + "/rseContestMoveType").then(
            function (response) {
                return response.data;
            }
        );
    }

    service.findAllORAS = function() {
        return $http.get($rootScope.serviceHost + "/orasContestMoveType").then(
            function (response) {
                return response.data;
            }
        );
    }

    service.findAllDPP = function() {
        return $http.get($rootScope.serviceHost + "/dppContestMoveType").then(
            function (response) {
                return response.data;
            }
        );
    }

}]);