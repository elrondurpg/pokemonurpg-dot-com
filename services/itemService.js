'use strict';
app.service('itemService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/item").then(
            function (response) {
                return response.data;
            }
        );
    }

}]);