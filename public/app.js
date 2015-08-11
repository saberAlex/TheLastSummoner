var app = angular.module('App',['ngRoute','ngAnimate', 'ui.bootstrap']);

//creating the router. 
//add heroes:
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		 when("/", {
			templateUrl: "views/main.view.html"
		 }).
		 when('/arena',{
		 	templateUrl: 'views/jobs.view.html',
		 	controller: "JobCtrl"
		 }).
		 when('/login',{
			templateUrl: 'views/login.view.html',
			controller: 'LoginCtrl'
		 }).
		 when('/signup',{
			templateUrl: 'views/signup.view.html',
			controller: 'SignupCtrl'
		 }).
		otherwise({redirectTo: "/"});
}]);

app.run( function($rootScope, $location) {
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
		if($rootScope.user == null) {
			// if($location.path() !="/signup" || $location.path() !="/login") {
			// 	$location.path("/login");
			// }
		}
  });
});
