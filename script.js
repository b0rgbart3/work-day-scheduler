
//  Get the current day
//  Display it to the user
//  Display TimeBlocks for standard business hours (9am -5pm)
//  The timeblocks should be color coded based on what time it is
//  the timeblocks should be inputs
//  the save buttons should save the timeblock data to local storage


var date = moment().format("dddd, MMMM Do YYYY");  //, h:mm:ss a
$("#currentDay").text(date);

var currentHour = moment().format("h");
var current24Hour = 13; //moment().format("HH");

var blockDiv = $('#blocks');
var startHour = 9;
var workHours = 8;
var statusClass = [];
var storedStrings = {};

var displayBlocks = function() {

    for (var i = 0; i <= workHours; i++) {
        // Kevin Durrant
        // create a new row Dom element
        createRow(i);
    }
} 

var attachSaveButtonHandlers = function() {
    $(".saveBtn").click( function(event) {
        var btn = event.target;
        var btnId =  $(event.target).data("id");
        var rowText = $("#ta-" + btnId).val();
        localStorage.setItem("wks-" + btnId, rowText);
    });
}

var loadLocallyStoredValues = function() {
    for (var i = 0; i <= workHours; i++) {
        var storedString = localStorage.getItem("wks-" + i);
        storedStrings[i] = storedString;
    }
}


var createRow = function(i) {
        var displayHour;
        var displayHourText;

        if ((startHour + i) < 12) {
            displayHour = startHour + i;
            displayHourText = displayHour + " AM";
        } else {
            if ((startHour + i) == 12) {
                displayHour = 12;
                displayHourText= "12 PM";
            } else {
                displayHour = startHour + i -12;
                displayHourText = displayHour + " PM";}
             }
        
        if ((startHour + i) < current24Hour) {
            statusClass.push("past");
        }
        if ((startHour + i) == current24Hour) {
            statusClass.push("present");
        }
        if ((startHour +i) > current24Hour) {
            statusClass.push( "future" );
        }
        
        var newRow = $("<div class='row'>");
        var newHourLabel = $("<div class='hour col-1 text-right'>"+displayHourText+"</div>");
        var newTextAreaString = "<div class='col-10'><textarea id='ta-"+i+"'>";
        
        if (storedStrings[i]) {
            newTextAreaString += storedStrings[i];
        }
        newTextAreaString += "</textarea></div>";

        var newTextArea = $(newTextAreaString);
        var newSaveButton=  $("<div class='saveBtn col-1 fas fa-save text-white' data-id='"+i+"'></div>");

        blockDiv.append(newRow);
        newRow.append(newHourLabel);      
        newTextArea.addClass(statusClass[i]);
        newRow.append(newTextArea);
        newRow.append(newSaveButton);
}

var disablePastBlocks = function() {
    for (var i = 0; i <= workHours; i++) {
        if (statusClass[i] === "past") {
            var thisTextArea = $("#ta-" + i);
            thisTextArea.prop('disabled', true);
        }
    }
}
$( document ).ready(function() {
    loadLocallyStoredValues();
    displayBlocks();
    disablePastBlocks();
    attachSaveButtonHandlers();
});