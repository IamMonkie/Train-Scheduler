$(document).ready(function() {
  // Initialize Firebase
  const config = {
    apiKey: "AIzaSyD6uP3X88xIB92_32rauAr-0OJKm7SezJQ",
    authDomain: "trainscheduler-6b591.firebaseapp.com",
    databaseURL: "https://trainscheduler-6b591.firebaseio.com",
    projectId: "trainscheduler-6b591",
    storageBucket: "trainscheduler-6b591.appspot.com",
    messagingSenderId: "219420588783"
  };
  firebase.initializeApp(config);

  // Create a variable to reference the database.
  const database = firebase.database();

  // Initial Values
  let name = "";
  let destination = "";
  let frequency = 0;
  let arrivalTime = "";

  // Capture Button Click
  $("#btnContainer").on("click", function(event) {
    event.preventDefault();

    console.log(
      "SUBMIT CLICKED" +
        "\n" +
        "name: " +
        name +
        "\n" +
        "destination: " +
        destination +
        "\n" +
        "frequency: " +
        frequency +
        "\n" +
        "Arrival Time: " +
        arrivalTime
    );

    // Grabbed values from text boxes
    name = $("#tName-input")
      .val()
      .trim();
    destination = $("#tDestination-input")
      .val()
      .trim();
    frequency = $("#tFrequency-input")
      .val()
      .trim();
    arrivalTime = $("#tArrival-input")
      .val()
      .trim();

    // create new table entry from user input

    // Code for handling the push
    database.ref().push({
      name: name,
      destination: destination,
      frequency: frequency,
      arrivalTime: arrivalTime,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  // Firebase watcher .on("child_added"
  database.ref().on(
    "child_added",
    function(snapshot) {
      // storing the snapshot.val() in a variable for convenience
      let sv = snapshot.val();

      // Console.loging the last user's data
      console.log(sv.name);
      console.log(sv.email);
      console.log(sv.age);
      console.log(sv.comment);

      // Change the HTML to reflect
      $("#junbotronH1").text(sv.name);
      $("#jumbotronH2").text(
        "THE NEXT TRAIN WILL ARRIVE IN " + sv.arrivalTime + " "
      );
      $("#tName").text(sv.name);
      $("#tDestination").text(sv.destination);
      $("#tFrequency").text(sv.frequency);
      $("#tArrival").text(sv.arrivalTime);

      //add to table
      $("#trainInfo tr:last").after(
        "<tr>sv.name</tr><tr>sv.destination</tr><tr>sv.frequency</tr><tr>sv.arrivalTime</tr>"
      );

      // Handle the errors
    },
    function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    }
  );
});

// --------------------------------------------------------------------------------
// Functions

// $("#button").on("click", function(event) {
//     console.log("hit")
//     event.preventDefault();

//     $("#jumbotronH1").text("nextTrain: ");
// });

// ===========================================================================================================

// Assume the following situations.

// (TEST 1)
// First Train of the Day is 3:00 AM
// Assume Train comes every 3 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:18 -- 2 minutes away

// (TEST 2)
// First Train of the Day is 3:00 AM
// Assume Train comes every 7 minutes.
// Assume the current time is 3:16 AM....
// What time would the next train be...? (Use your brain first)
// It would be 3:21 -- 5 minutes away

// ==========================================================

// Solved Mathematically
// Test case 1:
// 16 - 00 = 16
// 16 % 3 = 1 (Modulus is the remainder)
// 3 - 1 = 2 minutes away
// 2 + 3:16 = 3:18

// Solved Mathematically
// Test case 2:
// 16 - 00 = 16
// 16 % 7 = 2 (Modulus is the remainder)
// 7 - 2 = 5 minutes away
// 5 + 3:16 = 3:21
/*
// Assumptions
var tFrequency = sv.frequency;

// Time is 3:30 AM
var firstTime = "03:30";

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

// Next Train
var nextTrain = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));
*/
