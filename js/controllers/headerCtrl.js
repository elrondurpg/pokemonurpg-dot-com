// add a controller
app.controller('headerCtrl', [ '$window', function($window) {
	var ctrl = this;
	ctrl.searchType = 'Pokemon';
    ctrl.search = function () {
        var type = ctrl.searchType.toLowerCase();
        if (type == 'trainer')
            type = 'stats';
        else if (type != 'pokemon')
            type = '';
        //$location.path('/' + type + '/' + ctrl.searchText);
        $window.location.assign('/' + type + '/' + ctrl.searchText);
    }

}]);

app.directive('siteHeader', function() {
   return {
       restrict: 'E', 
       templateUrl: "/site-header.html"
   };
});