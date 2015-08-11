app.controller("LoginCtrl", function($scope, $rootScope, $http, $log, $location){

$scope.sendLogin = function() {
    $log.info("I am login");
     var data = {
      username: $scope.username,
      password: $scope.password
     };

     $http.post('/users/login', data).success(function(data, status){
      console.log(status);
      $log.info(data);
      $rootScope.user = data;
     });
  };

$rootScope.user;
$rootScope.$watch('user', function(){
  if($rootScope.user) {
     $location.path("/#/");
  }
});

});

app.controller("SignupCtrl", function($scope, $http, $log){
  $scope.submitDisable = true;
  $scope.userExist = true;
  $scope.$watch('[password,password2]', function (newValue, oldValue) {
    if(newValue[0] === newValue[1]) {
      $scope.submitDisable = false;
      $scope.showPasswordInfo = false;
    } else {
      $scope.submitDisable = true;
      $scope.showPasswordInfo = true;
    }
  });

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

});


app.controller("JobCtrl", function($scope, $rootScope, $http, $log, $location, jobsFactory){
  jobsFactory.getJobs().success(function(jobs){
    $scope.jobList = jobs;
    $log.info($scope.jobList);
  })
  .error( function(err){
    $log.error(err);
  });

  $scope.showJobInfo = function(key){
    console.log("I'm clicked");
    $scope.currentJob = $scope.jobList[key];
  }

}).directive('showJob', function() {
  return {
    templateUrl: "views/direct/job.direct.html",
    restrict:'AE'
  }
});