'use strict';
app.service('parkLocationService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/parklocation").then(
            function (response) {
                return response.data;
            }
        );
    }

}]);