
//  Get the current day
//  Display it to the user
//  Display TimeBlocks for standard business hours (9am -5pm)
//  The timeblocks should be color coded based on what time it is
//  the timeblocks should be inputs
//  the save buttons should save the timeblock data to local storage

var date = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
$("#currentDay").text(date);



