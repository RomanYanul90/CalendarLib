(function () {

    function mlSecFromStringTime(time) {
        var arrayFromTimeString = time.split(':').map(function (el) {
            return parseInt(el);
        })
        var result = 1000 * arrayFromTimeString[2] + arrayFromTimeString[1] * 60 * 1000 + arrayFromTimeString[0] * 60 * 60 * 1000;
        return result;
    }

    function changeDateParamsOrder(userParam) {
        var dateArr = userParam.split('/');
        dateArr[1] = dateArr.splice(0, 1, dateArr[1])[0];
        return dateArr.join('/')
    }

    function remindTimeCreate(remindTime, eventTime) {
        var parsedEventTime = Date.parse(eventTime);
        var dateParams = new Date(parsedEventTime - mlSecFromStringTime(remindTime)).toLocaleDateString();
        var timeParams = new Date(parsedEventTime - mlSecFromStringTime(remindTime)).toTimeString().split(" ")[0];
        return changeDateParamsOrder(dateParams) + " " + timeParams
    }

    function setReminder() {
        return function (reminder) {
            var eventsCopy = Calendar.getEventsList()
            eventsCopy.forEach(function (el) {
                if (reminder.id === "all") {
                    Calendar.setEvent({
                        id: el.id + "Remind",
                        date: remindTimeCreate(reminder.time, el.date),
                        name: el.eventName + "Remind",
                        callback: reminder.callback
                    })
                }
                if (el.id === reminder.id) {
                    Calendar.setEvent({
                        id: el.id + "Remind",
                        date: remindTimeCreate(reminder.time, el.date),
                        name: el.eventName + "Remind",
                        callback: reminder.callback
                    })
                }
            })
        }
    }

    Calendar.reminder = setReminder();
}())
