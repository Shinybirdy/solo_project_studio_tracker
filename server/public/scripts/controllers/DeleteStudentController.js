myApp.controller('DeleteStudentController', ['$scope', '$http', function ($scope, $http) {
  console.log("DeleteStudentController  is running");

  $scope.DeleteStudent = function () {

    var data = $.param({
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

    });

    $http({

      method: 'delete',
      url:'/students',
      data: studentToDelete

    }).then( function (response){

      console.log(response);
       //if err, then blah --- do this - SQL mojo
       loadStudents();
     });//end .then function


};//end Delete Student Function


  // $scope.updateSchedule = function(){
  //   console.log("Boom! Schedule Updated!");
  //   event.preventDefault();
  //   $scope.updateArray=[];
  //
  //   var updateObjectToSend ={
  //     first: $scope.firstName,
  //     last: $scope.lastName,
  //     lessonDay: $scope.lessonDay,
  //     lessonTime: $scope.lessonTime,
  //   };//end object



}]);
