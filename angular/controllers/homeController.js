
angular.module('homeController', []).controller('HomeController', function($scope) {

    $scope.title= 'Lost and Found';
    $scope

});

function RegisterCtrl($scope, $http, $location) {
  $scope.form = {};
  $scope.submitPost = function() {
    $http.post('/register', $scope.form).
      success(function(data) {
        $location.path('/');
      });
  };
}
