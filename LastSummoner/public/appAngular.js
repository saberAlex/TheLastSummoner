
( function() {
	var app = angular.module("lastSummoner", ["ngRoute", 'ui.bootstrap']);
	
	app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		 when("/", {
			templateUrl: "views/main.view.html",
			controller: "mainCtrl"
		 });
	}]);	


	var jobsFactory = function($http) {
		var factory = [];
		factory.getJobs = function() {
			return $http.get("/jobs");
		};
		factory.getJob = function(name){
			return $http.get("/jobs/"+name);
		}
		return factory;
	};
	
	app.factory("jobsFactory", jobsFactory);

	app.controller("mainCtrl", function($scope, $window, $modal, $log, $rootScope, $http, jobsFactory){
	//GET All the JOB:
	jobsFactory.getJobs().success(function(jobs){
	  $rootScope.jobList = jobs;
	  $log.info($rootScope.jobList);
	})
	.error( function(err){
	  $log.error(err);
	});

	//HERO RELATED:
	$scope.createHero = function() {
		var data = {
			name: $scope.hero.name, 
			job: $scope.hero.job
		};
		var url = "/users/createhero/" + $rootScope.user.username;		
		$http.post(url, data).success(function(data, status){
		 console.log(status);
		 if(data) $rootScope.user = data; 
		 $log.info($rootScope.user);
		});
	};

	$scope.deleteHero = function(key, index) {
		$log.info("Deleting hero");
		var url = "/users/deletehero/" + $rootScope.user.username + "/" + key;
		$http.delete(url).
		  then(function(response) {
		  	$rootScope.user = response.data;
		  	$log.info($rootScope.user);
		  }, function(response) {
		    alert("unable to delete hero");
		  });
	}

	//QUEST RELATED CONTROLLER
	$scope.buttonName = "edit";
		$scope.showEditDaily = function() {
			if($scope.showEdit) {
				$scope.buttonName = "edit";
			} else {
				$scope.buttonName = "cancel";
			}
			$scope.showEdit = !$scope.showEdit;
		}
	//LOGIN 
	$scope.login = function() {
	    $log.info("I am login");
	     var data = {
	      username: $scope.username,
	      password: $scope.password
	     };

	     $http.post('/users/login', data).success(function(data, status){
	      console.log(status);
	      $log.info(data);
	      $rootScope.user = data;
	      $log.info($rootScope.user);
	      $scope.isLogin = true;
	     });
	  };
	//LOGOUT...
	$scope.logout = function() {
	    $log.info("I am logging out");
	     $http.get('/users/logout').success(function(data, status){
	      $rootScope.user = null;
	      $log.info("User: " + $rootScope.user);
	      $scope.isLogin = false;
	     });
	  };
	//MODAL SIGN UP RELATED CONTROLLER
  $scope.animationsEnabled = true;
  $scope.open = function (size) {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/signup.modal.html',
      controller: ['$scope','$log', '$http', function($scope, $log, $http) {
      	$scope.userExist = true;
      	$scope.checkUsername = function() {
      	  var url = "/users/"+ $scope.username;
      	  $http.get(url).success(function(data){
      	    if(!data) {
      	      $scope.userExist = false;
      	      $scope.showUsernameInfo = false;
      	    } else {
      	      $scope.userExist = true;
      	      $scope.showUsernameInfo = true;
      	    }
      	});
      	  
      	}
        }],
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };

  $scope.openDaily = function (size) {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/daily.modal.html',
      controller: ['$scope','$log', '$http', '$rootScope', function($scope, $log, $http, $rootScope) {
      	$scope.userExist = true;
      	$scope.createDaily = function() {
      	  var url = "/dailys/create/"+ $rootScope.user.username;
      	  var data = {
      	  	name: $scope.daily.name,
      	  	info: $scope.daily.info,
      	  	rate: $scope.daily.rate
      	  }
	      $http.post(url, data).success(function(data, status){
	       console.log(status);
	       $rootScope.user = data;
	       $log.info($rootScope.user);
	      });
      	};
     }],
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };


    $scope.openTask = function (size) {
      var modalInstance = $modal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/modal/task.modal.html',
        controller: ['$scope','$log', '$http', '$rootScope', function($scope, $log, $http, $rootScope) {
        	$scope.userExist = true;
        	$scope.createTask = function() {
        	  var url = "/tasks/create/"+ $rootScope.user.username;
        	  var data = {
        	  	name: $scope.task.name,
        	  	info: $scope.task.info,
        	  	rate: $scope.task.rate,
        	  	deadline: $scope.task.deadline

        	  }
  	      $http.post(url, data).success(function(data, status){
  	       console.log(status);
  	       $rootScope.user = data;
  	       $log.info($rootScope.user);
  	      });
        	};
       }],
        size: size,
        resolve: {
          items: function () {
            return $scope.items;
          }
        }
      });
    };

  $scope.showDaily = function(key){
  	var id =  $rootScope.user.daily[key]._id;
  	$http.put("/dailys/update/"+ id).success(function(data){
  		if(data){
  			$rootScope.user.daily[key] = data;
  		} 
  		 $scope.quest = jQuery.extend(true, {}, $rootScope.user.daily[key]);
  		 $scope.isDaily = true;
  	});
  }
  	
  	//$scope.quest.isDaily = false;
  	  		 $scope.isDaily = false;


  $scope.showTask = function(key){
  	var id =  $rootScope.user.task[key]._id;
  	$http.put("/tasks/update/"+ id).success(function(data){
  		if(data){
  			$rootScope.user.task[key] = data;
  		} 
  		 $scope.quest = jQuery.extend(true, {}, $rootScope.user.task[key]);
  		 $scope.isDaily = false;
  		
  	});
  }

  $scope.submitCompleteQuest = function( isDaily, quest ) {
  	quest.completed = true;
  	if(!$scope.isDaily) {
  		var id =  quest._id;
  		$http.put("/tasks/complete/"+ id).success(function(data){
  			  		if(data){
  			$rootScope.user.task[key] = data;
  		} 
  		 $scope.quest = jQuery.extend(true, {}, $rootScope.user.task[key]);
  		});
  	}
  }


  $scope.getUpdate = function() {
  	$http.get("dailys/getdaily/" +$rootScope.user.username).success(function(data){
  		$rootScope.user.daily = data;
  		$log.info($rootScope.user.daily);

  	});
  	$http.get("tasks/gettasks/" +$rootScope.user.username).success(function(data){
  		$rootScope.user.task = data;
  		$log.info("the task");
  		$log.info($rootScope.user.task[0]._id);

  	});
  };

});


})();