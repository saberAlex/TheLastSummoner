var app = angular.module('App',['ngRoute']);

//creating the router. 
//add heroes:
app.config(['$routeProvider', function($routeProvider){
	$routeProvider.
		 when("/", {
		 	templateUrl: "views/main.view.html"
		 }).
		 when('/login',{
		 	templateUrl: 'views/login.view.html',
		 	controller: 'LoginCtrl'
		 }).
		 when('/signup',{
		 	templateUrl: 'views/signup.view.html',
		 	controller: 'SignupCtrl'
		 }).
		// // when('/articles/details/:id',{
		// // 	templateUrl: 'views/article_details.view.html',
		// // 	controller: 'ArticleDetailsCtrl'
		// // }).
		// // when('/articles/category/:category',{
		// // 	templateUrl: 'views/cat_articles.view.html',
		// // 	controller: 'ArticlesCategoryCtrl'
		// // }).
		// // when('/categories',{
		// // 	templateUrl: 'views/categories.view.html',
		// // 	controller: 'CategoriesCtrl'
		// // }).
		// when('/heros/add',{
		//  	templateUrl: 'views/add_hero.view.html',
		//  	controller: 'ArticleCreateCtrl'
		//  }).
		// when('/send/email', {
		// 	templateUrl: "views/send_email.view.html",
		// 	controller: "SendEmailCtrl"
		// }).
		// when("/users/login", {
		// 	templateUrl: "views/login.view.html",
		// 	controller: "LoginCtrl"
		// }).
		// when("/users/register", {
		// 	templateUrl: "views/signup.view.html",
		// 	controller: "SignupCtrl"
		// }).
		// when('/articles/edit/:id',{
		// 	templateUrl: 'views/edit_article.view.html',
		// 	controller: 'ArticleEditCtrl'
		// }).
		otherwise({redirectTo: "/"});
}]);