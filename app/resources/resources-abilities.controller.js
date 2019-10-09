app.controller('resourcesAbilitiesCtrl', ['abilityService', function(abilityService) {

	var ctrl = this;

    ctrl.searchKey = "";

    abilityService.findAll()
    .then(
        function(response) {
            if (response.status == 200) {
                ctrl.items = response.data;
            }
            else {
                ctrl.error("An error occurred while trying to load abilities from URPG Server. Please contact a system administrator if this problem persists.");
            }
        }
    );

	ctrl.loadMain = function() {
	    ctrl.loaded = false;
        ctrl.ability = {};
        ctrl.delta = {};
	    if (ctrl.searchKey !== undefined && ctrl.searchKey != '') {
	        abilityService.findByName(ctrl.searchKey).then(function (response) {
	            if (response.status == 200) {
	                ctrl.notFound = false;
                    ctrl.ability = response.data;
                    ctrl.delta.name = ctrl.ability.name;
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
	    ctrl.ability = {};
	    ctrl.delta = {};
	    ctrl.loaded = true;
	    ctrl.editType = "create";
	}

    ctrl.save = function() {
        if (ctrl.ability.name !== undefined || ctrl.delta.name !== undefined) {
            if (ctrl.editType == "update") {
                abilityService.updateAbility(ctrl.delta)
                .success(
                    function(response) {
                        ctrl.success = response.data;
                        ctrl.searchKey = ctrl.ability.name;
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
                abilityService.createAbility(ctrl.delta)
                .success(
                    function(response) {
                        ctrl.success = response.data;
                        ctrl.searchKey = ctrl.ability.name;
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

    ctrl.isEmpty = function(object) {
        return Object.keys(object).length === 0;
    }

}]);