app.controller('resourcesMembersCtrl', ['userService', 'roleService', function(userService, roleService) {

	var ctrl = this;

    ctrl.searchKey = "";

	ctrl.loadMain = function() {
	    ctrl.loaded = false;
        ctrl.member = {};
        ctrl.delta = {};
	    if (ctrl.searchKey !== undefined && ctrl.searchKey != '') {
	        userService.findByName(ctrl.searchKey).then(function (response) {
	            if (response.status == 200) {
	                ctrl.notFound = false;
                    ctrl.member = response.data;
                    ctrl.delta.name = ctrl.member.username;
                    ctrl.createRolesDelta();
	                ctrl.loaded = true;
	                ctrl.editType = "update";
	            }
	            else {
                    ctrl.notFound = true;
                }
	        });
	    }
	}

	ctrl.loadRoles = function() {
	    roleService.findAll().then(function(response) {
	        if (response.status == 200) {
	            ctrl.roles = response.data;
	        }
	        else {
	            console.log("Encountered an error while trying to load the list of roles from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
	        }
	    });
	}

	ctrl.loadRoles();

	ctrl.createRolesDelta = function() {
        ctrl.rolesDelta = {};
        for (var i = 0; i < ctrl.member.roles.length; i++) {
            var role = ctrl.member.roles[i];
            ctrl.rolesDelta[role] = {};
            ctrl.rolesDelta[role].deleted = false;
        }
    }

    ctrl.addRole = function() {
        if (ctrl.rolesDelta[ctrl.newRole] === undefined) {
            ctrl.rolesDelta[ctrl.newRole] = {};
            ctrl.rolesDelta[ctrl.newRole].deleted = false;

            var role = {
                name: ctrl.newRole,
                unsaved: true
            };

            if (ctrl.member.roles === undefined) {
                ctrl.member.roles = [];
            }
            ctrl.member.roles.unshift(role.name);
        }

        ctrl.clearRole();
    }

    ctrl.clearRole = function() {
        ctrl.newRole = "";
    }

    ctrl.save = function() {
        if (ctrl.member.username !== undefined || ctrl.delta.name !== undefined) {
            ctrl.stageRolesDelta();
            if (ctrl.editType == "update") {
                userService.updateMember(ctrl.delta)
                .success(
                    function(response) {
                        ctrl.success = response.data;
                        ctrl.searchKey = ctrl.member.username;
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

    ctrl.stageRolesDelta = function () {
        ctrl.delta.roles = [];
        for (name in ctrl.rolesDelta) {
            ctrl.stageRole(name);
        }
    }

    ctrl.stageRole = function(name) {
        var role = ctrl.rolesDelta[name];
        role.name = name;
        ctrl.delta.roles.push(role);
    }


    ctrl.isEmpty = function(object) {
        return Object.keys(object).length === 0;
    }

}]);