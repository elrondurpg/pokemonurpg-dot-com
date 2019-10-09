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

    ctrl.switchPage = function(action) {
        ctrl.action = action;
        ctrl.error = undefined;
        ctrl.success = undefined;
        ctrl.errorArray = undefined;
    }

    ctrl.login = function() {
        userService.login(ctrl.loginDto)
        .success(
            function(response) {
                ctrl.success = "Success!";
                $window.location.reload();
            }
        )
        .error(
            function(response) {
                ctrl.error = response.data;
            }
        );
    }

    ctrl.registerBeta = function () {
        if (ctrl.validateRegisterBeta()) {
            ctrl.error = undefined;
            userService.registerBeta(ctrl.registerBetaDto)
            .then(
                function(response) {
                    if (response.status == 200) {
                        ctrl.success = "Success! Click 'Sign In' below to access your account.";
                    }
                    else {
                        ctrl.error = response.data;
                    }
                }
            )
        }
        else {
            ctrl.error = "Password does not meet requirements."
        }
    }

    ctrl.passwordRegex = /((?=.*[a-z])(?=.*\d)(?=.*[A-Z]).{8,40})/;
    ctrl.validateRegisterBeta = function() {
        console.log(ctrl.registerBetaDto.password);
        return ctrl.passwordRegex.exec(ctrl.registerBetaDto.password);
    }

    ctrl.logout = function() {
        userService.logout().then(function(response) {
             if (response.status == 200) {
                $window.location.reload();
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