var app = angular.module('flapperNews', ['ui.router']);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

  $stateProvider
    .state('posts', {
  		url: '/posts/{id}',
  		templateUrl: '/posts.html',
  		controller: 'PostsCtrl'
});

  $urlRouterProvider.otherwise('home');
}]);



app.controller('PostsCtrl',[
'$scope',
'$stateParams',
'posts',
function($scope,$stateParams,posts){

	$scope.post = posts.posts[$stateParams.id];

	$scope.addComment = function(){
  if($scope.body === '') { return; }
  $scope.post.comments.push({
    body: $scope.body,
    author: 'user',
    upvotes: 0
  });
  $scope.body = '';
};

}]);

app.controller('MainCtrl', [
'$scope',
'posts',
function($scope, posts){
  $scope.test = 'Hello world!';

  $scope.posts = posts.posts;


  $scope.addPost = function () {
  	// body...
  	if($scope.newTitle!=''){
  	$scope.posts.push({
  		title: $scope.newTitle,
  		link: $scope.link,
  		upvotes: 0,
  		comments: []
  	});
  	$scope.newTitle='';
  	$scope.link='';
  }
  }

  $scope.incrementUpVotes = function(post){
  	post.upvotes ++;
  }

  $scope.decrementVotes = function(post){
  	post.upvotes --;
  }

}]);

//Factory module to make data available to other modules.
app.factory('posts',[function(){
	var o = {

		posts: []
	};

	return o;
}]);