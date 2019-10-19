'use strict';
app.service('typeService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/type").then(
            function (response) {
                return response.data;
            }
        );
    }

}]);