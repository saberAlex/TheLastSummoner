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
      $rootScope.user = data;
      $log.info($rootScope.user);
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
  $scope.showCreateDaily = false;
  $scope.openDailyCreator = function() {
      $scope.showCreateDaily = !$scope.showCreateDaily;
  }

  $rootScope.user.getHero = function(key) {
    if(key == -1){
      return "all";
    } else {
      return $rootScope.user.heros[key].name + ";exp: " + $rootScope.user.heros[key].exp ;
    }
  }

  $scope.createDaily = function(event) {
    event.preventDefault();
    var newDaily = {
      name: $scope.name,
      username: $rootScope.user.username,
      info: $scope.info,
      rate: $scope.rate
    }
    var url = "/quests/createDaily";
    var promise = $http.post(url, newDaily);
    promise.then(
       function(data) {
            $rootScope.user = data;
            $log.info($rootScope.user);
          });
}

  $scope.getDaily = function() {
     $scope.showDaily = true;
    var promise = $http.get("/quests/getdaily/"+$rootScope.user.username);
    promise.then(
      function(data){
        $rootScope.user.dailys;
        $log.info(data);
        $rootScope.user.dailys = data.data[0].quest.daily;
        $log.info($rootScope.user.dailys);
      });
  }

  $scope.openDetailDaily = function() {

  }

  $scope.dummydate = new Date();
  $scope.dummyComplete = false;
  $scope.isDisabled = false;

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
  
  $scope.createHero = function() {
    var data = {
      name: $scope.name,
      job: $scope.selectedJob
    }
    $log.info(data);

    var url = "/users/createhero/"+ $rootScope.user.username;
    var promise = $http.post(url, data);
    promise.then(
       function(data) {
          $http.get("/users/" + $rootScope.user.username).
          success(function(data){
            $rootScope.user = data;
            $log.info($rootScope.user);
          });
       });
  }

  $scope.deleteHero = function( heroid ){
    var url = "/users/delete/" + $rootScope.user.username + "/id/" + heroid ;
    $log.info(heroid);
    $http.delete(url).success(function(err, data){
      if(err) console.log(err);
      //$log.info(data);
      $rootScope.user = data;
    });
  };




  });
