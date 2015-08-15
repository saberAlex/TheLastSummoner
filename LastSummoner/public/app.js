
( function() {
	var app = angular.module("lastSummoner", ["ngRoute", 'ui.bootstrap']);
	
	app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		 when("/", {
			templateUrl: "views/main.view.html",
			controller: "mainCtrl"
		 });
	}]);	


	app.controller("mainCtrl", function($scope, $window, $modal, $log){
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
	//MODAL SIGN UP RELATED CONTROLLER
  $scope.animationsEnabled = true;
  $scope.open = function (size) {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/signup.modal.html',
      controller: ['$scope','$log', function($scope, $log) {
      		$log.info("I am a controller YAY");
      		$scope.items = ['item1', 'item2', 'item3'];
        }],
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });
  };
});


})();