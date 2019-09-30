app.controller('headerCtrl', [ 'userService', '$window', function(userService, $window) {
	var ctrl = this;

	ctrl.searchType = 'Pokemon';
    ctrl.search = function () {
        var type = ctrl.searchType.toLowerCase();
        if (type == 'trainer')
            type = 'stats';
        else if (type != 'pokemon')
            type = '';
        //$location.path('/' + type + '/' + ctrl.searchText);
        $window.location.assign('/app/' + type + '/' + ctrl.searchText);
    }

    ctrl.getUser = function() {
        return userService.getUser();
    }

}]);