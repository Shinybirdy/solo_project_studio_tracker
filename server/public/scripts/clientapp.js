console.log("Hi from client app!");

var myApp = angular.module('myApp',['ngRoute']);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
    when("/home", {
      templateUrl:"/views/home.html",
      controller:"HomeController"
    }).
    when("/logIn", {
      templateUrl:"/views/logIn.html",
      controller:"LogInController"
    }).
    // when("/masterSchedule", {
    //   templateUrl:"/views/masterSchedule.html",
    //   controller:"MasterScheduleController"
    // }).
    when("/students", {
      templateUrl:"/views/students.html",
      controller:"StudentController"
    }).
    when("/practiceWorksheet", {
      templateUrl:"/views/practiceWorksheet.html",
      controller:"WorksheetController"
     }).
     when("/studioPolicies", {
       templateUrl:"/views/studioPolicies.html",
       controller:"StudioPoliciesController"
      }).
      when("/notes", {
        templateUrl:"/views/students.html",
        controller:"StudentNotesController"
       }).


    otherwise({
      redirectTo:"home"
    });

}]);
