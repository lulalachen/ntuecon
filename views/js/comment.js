angular.module('flapperNews', ['ui.router'])
.factory('posts', ['$http', function($http){
	var o = {
		posts: []
	};


	o.getAll = function() {
		return $http.get('/comment/posts').success(function(data){
		  angular.copy(data, o.posts);
		});
	};

	o.create = function(post) {
		return $http.post('/comment/posts', post).success(function(data){
			o.posts.push(data);
		});
	};
	o.upvote = function(post) {
		return $http.put('/comment/posts/' + post._id + '/upvote')
		.success(function(data){
		  post.upvotes += 1;
		});
	};
	o.get = function(id) {
		return $http.get('/comment/posts/' + id).then(function(res){
			return res.data;
		});
	};
	o.addComment = function(id, comment) {
	  return $http.post('/comment/posts/' + id + '/comments', comment);
	};
	o.upvoteComment = function(post, comment) {
	  return $http.put('/comment/posts/' + post._id + '/comments/'+ comment._id + '/upvote')
	    .success(function(data){
	      comment.upvotes += 1;
	    });
	};
	return o;
}])
.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/comment',
      templateUrl: '/home.html',
      controller: 'MainCtrl',
      resolve: {
		postPromise: ['posts', function(posts){
		  return posts.getAll();
		}]
	  }
    })
    .state('posts', {
	  url: '/posts/{id}',
	  templateUrl: '/posts.html',
	  controller: 'PostsCtrl',
	  resolve: {
		post: ['$stateParams', 'posts', function($stateParams, posts) {
	      return posts.get($stateParams.id);
		}]
	  }
	});

  $urlRouterProvider.otherwise('home');
}])
.controller('MainCtrl', [
'$scope',
'posts',
function($scope,posts){
	$scope.test = 'Hello world!';
	$scope.posts = posts.posts;
	$scope.addPost = function(){
		if(!$scope.title || $scope.title === '') { return; }
		posts.create({
			title: $scope.title,
			link: $scope.link,
		});
		$scope.title = '';
		$scope.link = '';
	};
	$scope.incrementUpvotes = function(post) {
		posts.upvote(post);
	};


}])
.controller('PostsCtrl', [
	'posts',
	'$stateParams',
	'$scope',
function(posts,$stateParams,$scope){
	$scope.post = post;

	$scope.addComment = function(){
	  if($scope.body === '') { return; }
	  posts.addComment(post._id, {
	    body: $scope.body,
	    author: 'user',
	  }).success(function(comment) {
	    $scope.post.comments.push(comment);
	  });
	  $scope.body = '';
	};
	$scope.incrementUpvotes = function(comment){
	  posts.upvoteComment(post, comment);
	};
	
}]);


