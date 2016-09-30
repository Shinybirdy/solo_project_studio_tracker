console.log("Hi from client app!");

var myApp = angular.module('myApp',['ngRoute']);

myApp.config(["$routeProvider", function($routeProvider){
  $routeProvider.
    when("/home", {
      templateUrl:"/views/home.html",

    }).
    when("/logIn", {
      templateUrl:"/views/logIn.html",
      controller: "AuthController",
      controllerAs: "auth"
    }).
    when("/register", {
      templateUrl:"/views/register.html",
      controller: "AuthController",
      controllerAs: "auth"
    }).
    when("/students", {
      templateUrl:"/views/students.html",
      controller:"StudentController",
      controllerAs: "students"
    }).
     when("/studioPolicies", {
       templateUrl:"/views/studioPolicies.html",
       controller:"StudioPoliciesController",
       controllerAs: "policies"
      }).
      when("/studioAgreementForm", {
        templateUrl:"/views/studioAgreementForm.html",
        controller:"StudioPoliciesController",
        controllerAs: "policies"
       }).
      when("/practiceWorksheets", {
        templateUrl:"/views/practiceWorksheets.html",
         }).
      otherwise({
        redirectTo:"login"
      });

}]);
