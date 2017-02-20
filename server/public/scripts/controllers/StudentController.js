myApp.controller('StudentController', ['$scope', '$http', function ($scope, $http) {
console.log("student controller is running!!!");
//angular.module('whiteframeBasicUsage', ['ngMaterial']);
  // var studentArray =[];
  // var addStudentObjectToSend;

  var loadStudents = function(){

     $http({
      method: "GET",
       url: "/students",
     }).then( function( response ){
      $scope.studentArray = response.data;
      console.log("get Students! GET");
    }); //end .then
  };//end loadStudents

  $scope.addStudent = function () {
    console.log("CLICK!");
    event.preventDefault();
      $scope.studentArray = [];
      addStudentObjectToSend = {
        first: $scope.firstName,
        last: $scope.lastName,
        lessonDay: $scope.lessonDay,
        lessonTime: $scope.lessonTime,
        email: $scope.email,
        phoneNumber: $scope.phoneNumber,
        currentBalance: $scope.currentBalance,
        makeupLessons: $scope.makeupLessons,
        waitList: $scope.waitList,
        lessonRate: $scope.lessonRate
      };//end object

      $http({
       method: 'POST',
       url: '/students',//studentRoute.js has the answer.....
       data: addStudentObjectToSend
      }).then(function(response){

       console.log(response);
       //if err, then blah --- do this - SQL mojo
       loadStudents();

     });
     $scope.studentArray.push(addStudentObjectToSend);


    }; // end addStudent function

$scope.getStudents = function(){
      loadStudents();
};

$scope.getStudents();

 var studentToDelete;

  // DELETE Student!!!
$scope.deleteStudent = function(){
  console.log('clicked Delete!');
    var studentToDelete = {
        id:$scope.id,
        first: $scope.firstName,
        last: $scope.lastName,
        lessonDay: $scope.lessonDay,
        lessonTime: $scope.lessonTime,
        email: $scope.email,
        phoneNumber: $scope.phoneNumber,
        currentBalance: $scope.currentBalance,
        makeupLessons: $scope.makeupLessons,
        waitList: $scope.waitList,
        lessonRate: $scope.lessonRate
      };
    console.log("studentToDelete  ", studentToDelete);
  }; //end deleteStudent function

  $http({
    method: 'DELETE',
    url:'/students',
    data: studentToDelete
  }).then( function (response){

    console.log(response);
     //if err, then blah --- do this - SQL mojo
     loadStudents();
   });//end .then function



}]);
