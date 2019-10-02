app.controller('inviteCtrl', [ 'userService', function(userService) {
	var ctrl = this;

    ctrl.invite = function() {
        userService.invite(ctrl.inviteUsername).then(function(response) {
            if (response.status == 200 && response.data != '') {
                ctrl.betaKey = response.data;
            }
            else {
                ctrl.inviteError = true;
            }
        });
    }
}]);