app.directive('resourcesSearch', function() {
   return {
       restrict: 'E',
       templateUrl: "/app/resources/partials/resources-search.component.html"
   };
});

app.directive('resourcesPokemonEditor', function() {
   return {
       restrict: 'E',
       templateUrl: "/app/resources/partials/resources-pokemon-editor.component.html"
   };
});