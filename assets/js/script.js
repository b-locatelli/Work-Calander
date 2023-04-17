var timeDisplayEl = $('#time-display');
var eventsData;

function displayTime() {
    var rightNow = moment().format('MMM DD, YYYY [at] hh:mm:ss a');
    var dayOfWeek = moment().format('dddd');
    timeDisplayEl.text(rightNow + " (" + dayOfWeek + ")");
}

setInterval(displayTime, 1000);

function setHourColors() {
    var now = dayjs();
    for (var i = 9; i < 18; i++){
        if(i < now.hour()){
            $("#hour-" + i + " textarea").addClass("past");
        } else if (i == now.hour()) {
            $("#hour-" + i + " textarea").addClass("present");
        } else if (i > now.hour()){
            $("#hour-" + i + " textarea").addClass("future");
        }
    }
 }

function loadStoredData(event) {
    eventsData = JSON.parse(localStorage.getItem("calendarEvents"));
    if (!eventsData){
        eventsData = {
            hour9: "",
            hour10: "",
            hour11: "",
            hour12: "",
            hour1: "",
            hour2: "",
            hour3: "",
            hour4: "",
            hour5: ""
        };
    }
}

function handleSaveClick(event) {
    var hourBlock = $(event.target).parent();
    var value = hourBlock.children("textarea").val();
    var hour = hourBlock.attr('id').split("-")[1];
    eventsData["hour" + hour] = value;
    localStorage.setItem("calandarEvents", JSON.stringify(eventsData));
}

$('.saveBtn').on('click', handleSaveClick)

$(function() {
    loadStoredData()
    setHourColors();
});
