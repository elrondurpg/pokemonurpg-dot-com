'use strict';
app.service('attackTargetTypeService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/attacktargettype").then(
            function (response) {
                return response.data;
            }
        );
    }

}]);