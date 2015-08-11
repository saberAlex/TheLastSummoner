( function() {
	var jobsFactory = function($http) {
		var factory = [];
		factory.getJobs = function() {
			return $http.get("/jobs");
		};
		return factory;
	};
	
	angular.module("App").factory("jobsFactory", jobsFactory);
}());