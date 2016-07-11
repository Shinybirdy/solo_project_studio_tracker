console.log("Hi from client app!");

var myApp = angular.module('myApp',[]);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
    when("/home", {
      templateUrl:"/views/routes/home.html",
      controller:"HomeController"
    }).
    when("/master_schedule", {
      templateUrl:"/views/routes/master_schedule.html"
    }).
    when("/master_student_list", {
      templateUrl:"/views/routes/master_student_list.html"
    }).
    when("/add_student", {
      templateUrl:"/views/routes/add_student.html"
    }).
    otherwise({
      redirectTo:"home"
    });

}]);


myApp.controller("HomeController", ["$scope",function($scope){
  console.log("Loaded Home");
  $scope.counter =1;
  $scope.iterate=function(){
    $scope.counter++;
  };
}]);

myApp.controller("logInController", ["$scope", "$http", function($scope, $http){

}]);
