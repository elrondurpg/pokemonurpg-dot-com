app.controller('inviteCtrl', [ 'userService', function(userService) {
	var ctrl = this;

    ctrl.invite = function() {
        userService.invite(ctrl.inviteUsername)
        .success(
            function(response) {
                ctrl.error = undefined;
                ctrl.betaKey = response.data;
            }
        )
        .error(
            function(response) {
                ctrl.success = undefined;
                ctrl.error = response.data;
            }
        );
    }
}]);