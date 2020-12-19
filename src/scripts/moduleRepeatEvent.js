(function () {

    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", 'saturday', 'sunday']
    const oneDay = 24 * 60 * 60 * 1000

    function dateHandler(userDate) {
        var time = userDate.split(" ")[1];
        var date = userDate.split(" ")[0].split('.');
        date[1] = date.splice(0, 1, date[1])[0];
        if (time) {
            return new Date(`${date.join('.')} ${time}`);
        } else {
            return new Date(`${date.join('.')}`);
        }
    }

    // function dateChange(date) {
    //     var date = date.split('/');
    //     date[1] = date.splice(0, 1, date[1])[0];
    //     return date.join('.')
    // }

    function nextDayDateCreate(currentDay, days) {
        currentDay = dateHandler(currentDay);
        return new Date(Date.parse(currentDay) + days * oneDay).toLocaleDateString() + " " + new Date(Date.parse(currentDay) + days * oneDay).toTimeString().split(" ")[0]
    }

    function daysCount(startDate, dayOfWeek) {
        var count = 0
        var currentDayOfWeek = dateHandler(startDate).getDay()
        dayOfWeek = daysOfWeek.indexOf(dayOfWeek) + 1
        if (dayOfWeek > currentDayOfWeek) {
            count = dayOfWeek - currentDayOfWeek
        } else {
            count = 7 - currentDayOfWeek + dayOfWeek
        }
        return new Date(Date.parse(dateHandler(startDate)) + count * oneDay).toLocaleDateString() + " " + new Date(Date.parse(dateHandler(startDate)) + count * oneDay).toTimeString().split(" ")[0]
    }

    function setEventDecorator(func) {
        return function (date, event, callback, period) {
            if (period === "every day") {
                var newCallback = function () {
                    callback();
                    var nextDay = nextDayDateCreate(date, 1);
                    Calendar.setEvent(nextDay, event, newCallback);
                }
                return func(date, event, newCallback);
            }
            if (typeof (period) === "string" && period !== "every day") {
                const periodArray = period.split(",");
                var newCallback = function (date) {
                    callback();
                    var nextDay = nextDayDateCreate(date, 7);
                    Calendar.setEvent(nextDay, event, newCallback);
                }
                periodArray.forEach((el) => {
                    console.log(daysCount(date, el))
                    return Calendar.setEvent(daysCount(date, el), event, newCallback);
                })
            }
            return func(date, event, callback);
        }
    }

    Calendar.setEvent = setEventDecorator(Calendar.setEvent);
}())