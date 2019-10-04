app.controller('headerCtrl', [ 'userService', '$window', function(userService, $window) {
	var ctrl = this;

    ctrl.loginDto = { };
    ctrl.registerBetaDto = { };
    ctrl.action = 'login';

	ctrl.searchType = 'Pokemon';
    ctrl.search = function () {
        var type = ctrl.searchType.toLowerCase();
        if (type == 'trainer')
            type = 'stats';
        else if (type != 'pokemon')
            type = '';
        //$location.path('/' + type + '/' + ctrl.searchText);
        $window.location.assign('/' + type + '/' + ctrl.searchText);
    }

    ctrl.load = function() {
        userService.getUser().then(function(response) {
            ctrl.user = response;
        });
    }

    ctrl.load();

    ctrl.login = function() {
        userService.login(ctrl.loginDto).then(function(response) {
             if (response.status == 200) {
                ctrl.load();
                // TODO
                // Bring the user to their login page?
             }
             else {
                // TODO
                // Show a better login error?
             }
        });
    }

    ctrl.registerBeta = function () {
        userService.registerBeta(ctrl.registerBetaDto).then(function(response) {
            if (response.status == 200) {
                // TODO
                // Let the user know they were successfully registered?
            }
            else {
                // TODO
                // Let the user know they were not successfully registered?
            }
        });
    }

    ctrl.logout = function() {
        userService.logout().then(function(response) {
             if (response.status == 200) {
                ctrl.load();
                // TODO
                // Let the user know they were successfully logged out?
             }
             else {
                // TODO
                // Let the user know they were not successfully logged out?
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

app.directive('userToolbarDropdown', function() {
    return {
        restrict: 'E',
        templateUrl: "/app/site-header/modals/user-toolbar-dropdown.component.html"
    };
});