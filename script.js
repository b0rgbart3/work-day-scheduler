// Javascript written by Bart Dority

//  Get the current day
//  Display it to the user
//  Display TimeBlocks for standard business hours (9am -5pm)
//  The timeblocks should be color coded based on what time it is
//  the timeblocks should be inputs
//  the save buttons should save the timeblock data to local storage


var date = moment().format("dddd, MMMM Do YYYY");  //, h:mm:ss a
$("#currentDay").text(date);

var currentHour = moment().format("h");
var current24Hour = moment().format("HH");

var blockDiv = $('#blocks');
var startHour = 9;
var workHours = 8;
var statusClass = [];
var storedStrings = {};

var displayBlocks = function() {

    for (var i = 0; i <= workHours; i++) {
        // create a new row Dom element for each workHour
        createRow(i);
    }
} 

// attachSaveButtonHandlers
// respond to button clicks on the save buttons
// by storing the text area with the matching ID #
// into LocalStorage
var attachSaveButtonHandlers = function() {
    $(".saveBtn").click( function(event) {
        var btn = event.target;
        var btnId =  $(event.target).data("id");
        var rowText = $("#ta-" + btnId).val();
        localStorage.setItem("wks-" + btnId, rowText);
    });
}

// loadLocallyStoredValues
// load in all of the stored row values
// and store them in an indexed object
var loadData= function() {
    for (var i = 0; i <= workHours; i++) {
        var storedString = localStorage.getItem("wks-" + i);
        storedStrings[i] = storedString;
    }
}

// createRow(row)
// this function generates an entire row Dom element composed of 4 div tags
// row is the row number (0-8)
var createRow = function(row) {
        var displayHour;
        var displayHourText;

        if ((startHour + row) < 12) {
            displayHour = startHour + row;
            displayHourText = displayHour + " AM";
        } else {
            if ((startHour + row) == 12) {
                displayHour = 12;
                displayHourText= "12 PM";
            } else {
                displayHour = startHour + row -12;
                displayHourText = displayHour + " PM";}
             }
        
        setTimeClasses(startHour +row);
        
        var newRow = $("<div class='row'>");
        var newHourLabel = $("<div class='hour col-1 text-right'>"+displayHourText+"</div>");
        var newTextAreaString = "<div class='col-10'><textarea id='ta-"+row+"'>";
        
        // If there is a value that we loaded in from Local Storage, then use it
        if (storedStrings[row]) {
            newTextAreaString += storedStrings[row];
        }
        newTextAreaString += "</textarea></div>";

        var newTextArea = $(newTextAreaString);
        var newSaveButton=  $("<div class='saveBtn col-1 fas fa-save text-white' data-id='"+row+"'></div>");

        blockDiv.append(newRow);
        newRow.append(newHourLabel);      
        newTextArea.addClass(statusClass[row]);
        newRow.append(newTextArea);
        newRow.append(newSaveButton);
}

// setTimeClasses
// create an array of "past", "present", and "future" strings
// that corresponds to weather the time of this row is in the past, present or future
// this array of strings will be used to assign the appropriate class to the timbeblock row
// which will change the color from gray to red to green
var setTimeClasses = function(rowNumber) {
    if (rowNumber < current24Hour) {
        statusClass.push("past");
    }
    if (rowNumber == current24Hour) {
        statusClass.push("present");
    }
    if (rowNumber > current24Hour) {
        statusClass.push( "future" );
    }
}

// disablePastBlocks
// If a row time is in the past, let's disable the textarea
// because we don't need to edit the events of the past
var disablePastBlocks = function() {
    for (var i = 0; i <= workHours; i++) {
        if (statusClass[i] === "past") {
            var thisTextArea = $("#ta-" + i);
            thisTextArea.prop('disabled', true);
        }
    }
}

// When the document is done loading, start the program
$( document ).ready(function() {
    loadData();
    displayBlocks();
    disablePastBlocks();
    attachSaveButtonHandlers();
});