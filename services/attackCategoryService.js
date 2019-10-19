'use strict';
app.service('attackCategoryService', ['$http', '$rootScope', function($http, $rootScope){

    var service = this;

    service.findAll = function() {
        return $http.get($rootScope.serviceHost + "/attackcategory").then(
            function (response) {
                return response.data;
            }
        );
    }

}]);