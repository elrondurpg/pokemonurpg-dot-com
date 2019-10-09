app.controller('resourcesAttacksCtrl', ['attackService', 'attackCategoryService', 'attackTargetTypeService', 'typeService', function(attackService, attackCategoryService, attackTargetTypeService, typeService) {

	var ctrl = this;

    ctrl.searchKey = "";

    attackService.findAll()
    .then(
        function(response) {
            if (response.status == 200) {
                ctrl.items = response.data;
            }
            else {
                ctrl.error("An error occurred while trying to load attacks from URPG Server. Please contact a system administrator if this problem persists.");
            }
        }
    );

	ctrl.loadMain = function() {
	    ctrl.loaded = false;
        ctrl.attack = {};
        ctrl.delta = {};
	    if (ctrl.searchKey !== undefined && ctrl.searchKey != '') {
	        attackService.findByName(ctrl.searchKey).then(function (response) {
	            if (response.status == 200) {
	                ctrl.notFound = false;
                    ctrl.attack = response.data;
                    ctrl.delta.name = ctrl.attack.name;
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
	    ctrl.attack = {};
	    ctrl.delta = {};
	    ctrl.loaded = true;
	    ctrl.editType = "create";
	}

	ctrl.loadTypes = function() {
	    typeService.findAll().then(function(response) {
            if (response.status == 200) {
                ctrl.types = response.data;
            }
            else {
                console.log("Encountered an error while trying to load the list of types from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
        });
	}

    ctrl.loadTypes();

    ctrl.loadAttackCategories = function() {
        attackCategoryService.findAll().then(function(response) {
            if (response.status == 200) {
                ctrl.attackCategories = response.data;
            }
            else {
                console.log("Encountered an error while trying to load the list of attack categories from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
        });
    }

    ctrl.loadAttackCategories();

    ctrl.loadAttackTargetTypes = function() {
        attackTargetTypeService.findAll().then(function(response) {
            if (response.status == 200) {
                ctrl.attackTargetTypes = response.data;
            }
            else {
                console.log("Encountered an error while trying to load the list of attack target types from URPG Server. Please contact a system administrator if this issue persists after refreshing your browser.");
            }
        });
    }

    ctrl.loadAttackTargetTypes();

    ctrl.save = function() {
        if (ctrl.attack.name !== undefined || ctrl.delta.name !== undefined) {
            if (ctrl.editType == "update") {
                attackService.updateAttack(ctrl.delta)
                .success(
                    function(response) {
                        ctrl.success = response.data;
                        ctrl.searchKey = ctrl.attack.name;
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
                attackService.createAttack(ctrl.delta)
                .success(
                    function(response) {
                        ctrl.success = response.data;
                        ctrl.searchKey = ctrl.attack.name;
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