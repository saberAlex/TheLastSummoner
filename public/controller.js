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
		var data  = {
			name: $scope.name,
			username: $scope.username,
			email: $scope.email,
			password: $scope.password
			//userpic: $scope.userpic
		}
		/*
		var formData = new FormData();
		formData.append("name", $scope.name);
		formData.append("email",$scope.email);
		formData.append("username",$scope.username);
		formData.append("password",$scope.password);
		//formData.append("userpic", document.getElementById('userpic').files[0]); 

		*/

		 $http.post('/users/register', data).success(function(data, status){
		 	console.log(status);
		 });

	};

$scope.uploadFile = function(files) {
    var fd = new FormData();
    //Take the first selected file
    fd.append("file", files[0]);
    fd.name = $scope.name;
    fd.email = $scope.email;
    fd.password = $scope.password;
    fd.username = $scope.username;

    $http.post('/users/register', fd, {
        withCredentials: true,
        headers: {'Content-Type': undefined },
        transformRequest: angular.identity
    }).success( ).error();

};


});