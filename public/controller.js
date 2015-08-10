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
	$scope.submitDisable = true;
	$scope.$watch('[password,password2]', function (newValue, oldValue) {
		if(newValue[0] === newValue[1]) {
			$scope.submitDisable = false;
		} else {
			$scope.submitDisable = true;
		}
	});

	



});