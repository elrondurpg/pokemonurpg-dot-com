app.controller('resourcesPermissionsCtrl', ['permissionService', function(permissionService) {

	var ctrl = this;

    ctrl.searchKey = "";

	ctrl.loadMain = function() {
	    ctrl.loaded = false;
	    ctrl.permissions = {};
        permissionService.findAll().then(function(response) {
            if (response.status == 200) {
                ctrl.permissions = response.data;
                ctrl.loaded = true;
            }
            else {
                console.log("Encountered an error while trying to load the list of permissions from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
        });
	}

	ctrl.loadMain();

    ctrl.save = function() {
        if (ctrl.newPermission !== undefined) {
            permissionService.createPermission(ctrl.newPermission)
            .success(
                function(response) {
                    ctrl.success = response.data;
                    ctrl.loadMain();
                }
            )
            .error(
                function(response) {
                    ctrl.error = response.data;
                }
            );
        }
    }

    ctrl.isEmpty = function(object) {
        return Object.keys(object).length === 0;
    }

}]);