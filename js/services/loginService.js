'use strict';
app.factory('loginService', ['$http', '$location', '$rootScope', '$window', 'sessionService', 'secureService', function($http, $location, $rootScope, $window, sessionService, secureService){
	return{
		login:function(data,scope){
            secureService.formhash(data);
			var $promise=$http.post('/data/login.php',data); //send data to user.php
			$promise.then(function(msg){
				var success=msg.data.logged;
                
				if(success != ""){
					//scope.msgtxt='Correct information';
					//sessionService.set('uid',uid);
					$window.location.assign('/stats/' + msg.data.user);
					//$location.path('/stats/' + msg.data.user);
				}	       
				else  {
					scope.msgtxt='incorrect information';
					$window.location.assign('/login');
					//$location.path('/login');
				}				   
			});
		},
		logout:function(){
            sessionService.username = "";
			sessionService.destroy('uid');
			//$location.path('/login');
		},
		islogged:function(){
			var $checkSessionServer=$http.post('/data/check_session.php');
			return $checkSessionServer;
			/*
			if(sessionService.get('user')) return true;
			else return false;
			*/
		},
	}

}]);