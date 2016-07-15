myApp.controller('StudentNotesController', ['$scope', '$http', function ($scope, $http) {
console.log("student Notes controller is running!!!");

  var loadNotes = function(){
    $http({
     method: "GET",
      url: "/notes",
    }).then( function( response ){
     $scope.notesArray = response.data;
     console.log("get Notes! GET");
   }); //end .then
 };//end loadNotes

  $scope.addNote = function(){
    console.log("Notes Click");
    event.preventDefault();
     $scope.notesArray =[];
     var notesObjectToSend ={

       studentId: $scope.student_id,
       notes: $scope.notes

     };//end notesObjectToSend


      $http({
       method: 'POST',
       url: '/notes',//studentNotesRoute.js has the answer.....
       data: notesObjectToSend
      }).then(function(response){
       console.log(response);
       //if err, then blah
       loadNotes();
     });
      $scope.studentNotesArray.push(notesObjectToSend);
      console.log("notes Array", $scope.notesArray);
  }; // end addStudent function

  $scope.getNotes = function(){
    loadNotes();

  };//end get Notes function

   $scope.getNotes();

 }]);
