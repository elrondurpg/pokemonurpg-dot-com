app.controller('resourcesRolesCtrl', ['roleService', 'permissionService', function(roleService, permissionService) {

	var ctrl = this;

    ctrl.searchKey = "";

	ctrl.loadMain = function() {
	    ctrl.loaded = false;
        ctrl.role = {};
        ctrl.delta = {};
	    if (ctrl.searchKey !== undefined && ctrl.searchKey != '') {
	        roleService.findByName(ctrl.searchKey).then(function (response) {
	            if (response.status == 200) {
	                ctrl.notFound = false;
                    ctrl.role = response.data;
                    ctrl.delta.name = ctrl.role.name;
                    ctrl.createPermissionsDelta();
	                ctrl.loaded = true;
	                ctrl.editType = "update";
	            }
	            else {
                    ctrl.notFound = true;
                }
	        });
	    }
	}

	ctrl.loadNew = function() {
	    ctrl.loaded = false;
	    ctrl.role = {};
	    ctrl.delta = {};
	    ctrl.delta.permissions = [];
	    ctrl.permissionsDelta = {};
	    ctrl.loaded = true;
	    ctrl.editType = "create";
	}

	ctrl.loadPermissions = function() {
	    permissionService.findAll().then(function(response) {
	        if (response.status == 200) {
	            ctrl.permissions = response.data;
	        }
	        else {
	            console.log("Encountered an error while trying to load the list of permissions from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
	        }
	    });
	}

	ctrl.loadPermissions();

	ctrl.createPermissionsDelta = function() {
        ctrl.permissionsDelta = {};
        for (var i = 0; i < ctrl.role.permissions.length; i++) {
            var permission = ctrl.role.permissions[i];
            ctrl.permissionsDelta[permission] = {};
            ctrl.permissionsDelta[permission].deleted = false;
        }
    }

    ctrl.addPermission = function() {
        if (ctrl.permissionsDelta[ctrl.newPermission] === undefined) {
            ctrl.permissionsDelta[ctrl.newPermission] = {};
            ctrl.permissionsDelta[ctrl.newPermission].deleted = false;

            var permission = {
                name: ctrl.newPermission,
                unsaved: true
            };

            if (ctrl.role.permissions === undefined) {
                ctrl.role.permissions = [];
            }
            ctrl.role.permissions.unshift(permission.name);
        }

        ctrl.clearPermission();
    }

    ctrl.clearPermission = function() {
        ctrl.newPermission = "";
    }

    ctrl.save = function() {
        if (ctrl.role.name !== undefined || ctrl.delta.name !== undefined) {
            ctrl.stagePermissionsDelta();
            if (ctrl.editType == "update") {
                roleService.updateRole(ctrl.delta)
                .success(
                    function(response) {
                        ctrl.success = response.data;
                        ctrl.searchKey = ctrl.role.name;
                        ctrl.loadMain();
                    }
                )
                .error(
                    function(response) {
                        ctrl.error = response.data;
                    }
                );
            }
            else if (ctrl.editType == "create") {
                roleService.createRole(ctrl.delta)
                .success(
                    function(response) {
                        ctrl.success = response.data;
                        ctrl.searchKey = ctrl.role.name;
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
    }

    ctrl.stagePermissionsDelta = function () {
        ctrl.delta.permissions = [];
        for (name in ctrl.permissionsDelta) {
            ctrl.stagePermission(name);
        }
    }

    ctrl.stagePermission = function(name) {
        var permission = ctrl.permissionsDelta[name];
        permission.name = name;
        ctrl.delta.permissions.push(permission);
    }


    ctrl.isEmpty = function(object) {
        return Object.keys(object).length === 0;
    }

}]);