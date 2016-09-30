myApp.controller('AuthController', ['$scope', '$http', function ($scope, $http) {
console.log("student controller is running!!!");
var authenticateUser = function(){

   $http({
    method: "GET",
     url: "/users",
   }).then( function( response ){
    $scope.user = response.data;
    console.log("for real!");
  });
};
  $scope.message = "Log In Controller!";
}]);
