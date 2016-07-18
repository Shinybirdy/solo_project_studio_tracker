console.log("Hi from client app!");

var myApp = angular.module('myApp',['ngRoute']);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
    when("/home", {
      templateUrl:"/views/home.html",
      
    }).
    when("/logIn", {
      templateUrl:"/views/logIn.html",

    }).
    when("/students", {
      templateUrl:"/views/students.html",
      controller:"StudentController"
    }).
     when("/studioPolicies", {
       templateUrl:"/views/studioPolicies.html",
       controller:"StudioPoliciesController"
      }).
      when("/studioAgreementForm", {
        templateUrl:"/views/studioAgreementForm.html",
        controller:"StudioPoliciesController"
       }).
      when("/practiceWorksheets", {
        templateUrl:"/views/practiceWorksheets.html",
         }).
      otherwise({
        redirectTo:"home"
      });

}]);
