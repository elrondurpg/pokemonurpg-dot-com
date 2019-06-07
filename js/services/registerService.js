'use strict';
app.factory('registerService', function($http, $location, sessionService, secureService){
	return{
		login:function(data,scope){
            secureService.formhash(data);
			var $promise=$http.post('/data/register.php',data); //send data to user.php
			$promise.then(function(msg){
				var success=msg.data.logged;
                
				if(success != ""){
					//scope.msgtxt='Correct information';
					//sessionService.set('uid',uid);
					$location.path('/home');
				}	       
				else  {
					scope.msgtxt='incorrect information';
					$location.path('/login');
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

});