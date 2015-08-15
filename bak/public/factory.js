( function() {
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
	
	angular.module("App").factory("jobsFactory", jobsFactory);
}());