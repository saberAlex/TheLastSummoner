"use strict";

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
    $rootScope.jobList = $scope.jobList;
    $log.info($scope.jobList);
  })
  .error( function(err){
    $log.error(err);
  });

  $scope.showJobInfo = function(key){
    console.log("I'm clicked");
    $scope.currentJob = $scope.jobList[key];
    $log.info($scope.currentJob);
  }

  $scope.$watch("currentJob", function() {
    if($scope.currentJob) {
      $scope.showInfo= true;
    } else {
      $scope.showInfo = false;
    }
  });


}).directive('showJob', function() {
  return {
    templateUrl: "views/direct/job.direct.html",
    restrict:'AE',
    controller: function($scope, $rootScope, $log, $http, jobsFactory){
        $scope.rate = 7;
        $scope.max = 10;
        $scope.isReadonly = false;

        $scope.hoveringOver = function(value) {
          $scope.overStar = value;
          $scope.percent = 100 * (value / $scope.max);
        };

        $scope.ratingStates = [
          {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
          {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
          {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
          {stateOn: 'glyphicon-heart'},
          {stateOff: 'glyphicon-off'}
        ];
        $scope.addComment = function() {
            $log.info("Commenting");
             var newData = {
              username: $rootScope.user.username,
              info: $scope.newComment,
              createddate: new Date(),
              userpic: $rootScope.user.profileimage
             };
             var url = "/jobs/" + $scope.currentJob.name;
             $http.post(url, newData).success(function(data, status){
                $scope.currentJob.comments.push(newData);
                $scope.newComment = "";
             });
          };

    }//end of ctrl
  }
});

app.controller("QuestCtrl", function($scope, $rootScope, $http, $log, $location){
  $scope.showDaily = false;
  $scope.openDailyCreator = function() {
      $scope.showDaily = !$scope.showDaily;
  }
  

});

app.controller("HeroCtrl", function($scope, $rootScope, $http, $log, $location, jobsFactory){
  $scope.jobList
  if(!$rootScope.jobList){
      jobsFactory.getJobs().success(function(jobs){
      $rootScope.jobList = jobs;
      console.log($rootScope.jobList);
      $scope.jobList = jobs;
      $log.info($scope.jobList);
    })
    .error( function(err){
      $log.error(err);
    });
  } else {
      $scope.jobList = $rootScope.jobList;
  }
  $scope.isClicked = function(key){
    alert(key);
  }
});
