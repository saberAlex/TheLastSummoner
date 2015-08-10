app.controller("LoginCtrl", function($scope, $http, $log){

$scope.sendLogin = function() {
		$log.info("I am login");
		// var data = {
		// 	username: $scope.username,
		// 	password: $scope.password
		// };

		// $http.post('/users/login', data).success(function(data, status){
		// 	console.log(status);
		// });

	};

});

app.controller("SignupCtrl", function($scope, $http, $log){

$scope.sendSignup = function() {
		$log.info("I am signup");
		// var data = {
		// 	username: $scope.username,
		// 	password: $scope.password
		// };

		// $http.post('/users/login', data).success(function(data, status){
		// 	console.log(status);
		// });

	};

});