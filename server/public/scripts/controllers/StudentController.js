myApp.controller('StudentController', ['$scope', '$http', function ($scope, $http) {
console.log("student controller is running!!!");

  var loadStudents = function(){

     $http({
      method: "GET",
       url: "/students",
     }).then( function( response ){
      $scope.studentArray = response.data;
      console.log("get Students! GET");
    }); //end .then
   };//end get Stude

  $scope.addStudent = function () {
    console.log("CLICK!");

    event.preventDefault();

    $scope.studentArray = [];

    var addStudentObjectToSend = {
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
       // .data is the data in the response; allStudents is the array of objects in students db
       loadStudents();

     });
      $scope.studentArray.push(addStudentObjectToSend);
        console.log("studentArray =  ", $scope.studentArray);
  }; // end addStudent function



  $scope.getStudents = function(){
    loadStudents();

  };


   $scope.getStudents();

 }]);
