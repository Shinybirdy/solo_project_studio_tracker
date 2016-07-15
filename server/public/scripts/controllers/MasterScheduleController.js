myApp.controller('MasterScheduleController', ['$scope', '$http', function ($scope, $http) {
  console.log("Master Schedule Controller is running");


  var loadSchedule = function(){
    $http({
     method: "GET",
      url: "/master_schedule",
    }).then( function( response ){
     $scope.scheduleArray = response.data;
     console.log("get Schedule! GET");
    }); //end .then
  };//end loadSchedule

  var loadMondaySchedule = function(){
    $http({
     method: "GET",
      url: "/master_schedule",
    }).then( function( response ){
     $scope.scheduleArray = response.data;
     console.log("get Schedule! GET");
    }); //end .then
  };//end loadSchedule

  $scope.updateSchedule = function(){
    console.log("Boom! Schedule Updated!");
    event.preventDefault();
    $scope.updateArray=[];

    var updateObjectToSend ={
      first: $scope.firstName,
      last: $scope.lastName,
      lessonDay: $scope.lessonDay,
      lessonTime: $scope.lessonTime,
    };//end object


    $http({
     method: 'POST',
     url: '/master_schedule',//studentRoute.js has the answer.....
     data: updateObjectToSend
    }).then(function(response){
     console.log(response);
     //if err, then blah --- do this - SQL mojo
     loadSchedule();
    });
    $scope.updateArray.push(updateObjectToSend);
    console.log("updateArray =  ", $scope.updateArray);

  }; // end updateSchedule function


    $scope.loadSchedule();







}]);
