'use strict';
app.service('artRankService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/artrank").then(
            function (response) {
                return response.data;
            }
        );
    }

}]);