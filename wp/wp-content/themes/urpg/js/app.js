// initialize the app
var app = angular.module('myApp', []);

// set the configuration
app.directive('siteFooter', function() {
   return {
       restrict: 'E', 
       templateUrl: "/site-footer.html"
   };
});