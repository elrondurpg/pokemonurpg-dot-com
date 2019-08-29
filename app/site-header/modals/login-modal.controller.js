'use strict';

app.controller('loginCtrl', ['userService', '$location', '$rootScope', '$window', function(userService, $location, $rootScope, $window) {
    var ctrl = this;
    ctrl.loginDto = { };
    ctrl.registerBetaDto = { };

    ctrl.action = 'login';

    ctrl.login = function() {
        ctrl.loginDto.browser = $window.navigator.userAgent;
        userService.login(ctrl.loginDto).then(function(response) {
             if (response.data.status == 200) {
                $window.location.assign('/app/dashboard/index.html');
             }
             else {
                ctrl.loginError = true;
             }
        });
    }
}]);

app.directive('loginModal', function() {
    return {
        restrict: 'E',
        templateUrl: "/app/site-header/modals/login-modal.component.html"
    };
});