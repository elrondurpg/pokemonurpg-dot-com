'use strict';
app.service('attackService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/attack").then(
            function (response) {
                return response.data;
            }
        );
    }

}]);