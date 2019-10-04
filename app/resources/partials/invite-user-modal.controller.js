app.controller('inviteCtrl', [ 'userService', function(userService) {
	var ctrl = this;

    ctrl.invite = function() {
        userService.invite(ctrl.inviteUsername)
        .success(
            function(response) {
                console.log(response);
                ctrl.betaKey = response.data;
            }
        )
        .error(
            function(response) {
                ctrl.inviteError = true;
            }
        );
    }
}]);