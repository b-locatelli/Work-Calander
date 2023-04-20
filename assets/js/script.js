// var timeDisplayEl = $('#time-display');
var eventsData = {};
var savedData = {};
// function displayTime() {
//     var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
//     var dayOfWeek = moment().format('dddd');
//     timeDisplayEl.text(rightNow + ", " + dayOfWeek + "");
// }

// setInterval(displayTime, 1000);


$("#currentDay").text(moment().format('dddd, MMM do YYYY'));



function setHourColors() {
    var now = dayjs();
    for (var i = 9; i <= 17; i++){
        if(i < now.hour()){
            $("#hour-" + i + " textarea").addClass("past");
        } else if (i == now.hour()) {
            $("#hour-" + i + " textarea").addClass("present");
        } else if (i > now.hour()){
            $("#hour-" + i + " textarea").addClass("future");
        }
    }
}

function loadStoredData() {
    eventsData = JSON.parse(localStorage.getItem("calendarEvents"));
    if (eventsData !== null){
        generate();
      } else { 
        eventsData = {
            hour9: "",
            hour10: "",
            hour11: "",
            hour12: "",
            hour13: "",
            hour14: "",
            hour15: "",
            hour16: "",
            hour17: ""
        };
    }

}

function handleSaveClick(event) {
    var hourBlock = $(event.target).parent();
    var value = hourBlock.children("textarea").val();
    var hour = hourBlock.attr('id').split("-")[1];
    eventsData["hour" + hour] = value; 
    localStorage.setItem("calendarEvents", JSON.stringify(eventsData));
}

function generate(){
    for (var i = 9; i < 18; i++){
        let textblockId = 'hour'+ i;
        console.log(textblockId);
        var textblock = document.querySelector(`#${textblockId}`);
        textblock.textContent = eventsData["hour" + i];
    }
}


$(function() {
    loadStoredData();
    setHourColors();
});

$('.saveBtn').on('click', handleSaveClick);
