app.controller('inviteCtrl', [ 'userService', function(userService) {
	var ctrl = this;
	ctrl.inviteDto = {};

    ctrl.invite = function() {
        userService.invite(ctrl.inviteDto)
        .success(
            function(response) {
                ctrl.error = undefined;
                ctrl.betaKey = response.data;
            }
        )
        .error(
            function(response) {
                ctrl.success = undefined;
                if (Array.isArray(response.data)) {
                    ctrl.errorArray = response.data;
                    console.log(ctrl.errorArray);
                }
                else {
                    ctrl.error = response.data;
                }
            }
        );
    }
}]);