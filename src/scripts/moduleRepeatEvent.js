(function () {

    var daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", 'saturday', 'sunday'];
    var oneDay = 24 * 60 * 60 * 1000;

    function generateId() {
        return Math.random().toString(36).substring(6);
    }

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

    function nextDayDateCreate(currentDay, days) {
        var currentDate = dateHandler(currentDay);
        var dateParams = new Date(Date.parse(currentDate) + days * oneDay).toLocaleDateString();
        var timeParams = new Date(Date.parse(currentDate) + days * oneDay).toTimeString().split(" ")[0];
        return dateParams + " " + timeParams;
    }

    function daysCount(startDate, dayOfWeek) {

        var count = 0;
        const currentDayOfWeek = dateHandler(startDate).getDay();
        var dayIndex = daysOfWeek.indexOf(dayOfWeek) + 1
        if (dayIndex > currentDayOfWeek) {
            count = dayIndex - currentDayOfWeek;

        var count = 0
        var currentDayOfWeek = dateHandler(startDate).getDay()
        dayOfWeek = daysOfWeek.indexOf(dayOfWeek) + 1
        if (dayOfWeek > currentDayOfWeek) {
            count = dayOfWeek - currentDayOfWeek

        } else {
            count = 7 - currentDayOfWeek + dayIndex;
        }

        var dateParams = new Date(Date.parse(dateHandler(startDate)) + count * oneDay).toLocaleDateString();
        var timeParams = new Date(Date.parse(dateHandler(startDate)) + count * oneDay).toTimeString().split(" ")[0]
        return dateParams + " " + timeParams;

        return new Date(Date.parse(dateHandler(startDate)) + count * oneDay).toLocaleDateString() + " " + new Date(Date.parse(dateHandler(startDate)) + count * oneDay).toTimeString().split(" ")[0]

    }

    function setEventDecorator(func) {
        return function (event) {
            if (event.period === "every day") {
                var id = generateId();
                var newCallback = function () {
                    event.callback();
                    var nextDay = nextDayDateCreate(event.date, 1);
                    Calendar.setEvent({id, name:event.name, date: nextDay, callback: newCallback});
                }
                return func({id, ...event, callback: newCallback});
            }


            if (event.period && event.period !== "every day") {
                var periodArray = [];
                var startDate = event.date;
                var id = generateId();

                if (event.period.split('').includes(',')) {
                    event.period.split(',').forEach(el => periodArray.push(el));
                } else {
                    periodArray.push(event.period);
                }

                var newCallback = function () {
                    event.callback();
                    var nextDay = nextDayDateCreate(event.date, 7);
                    Calendar.setEvent({id, date: nextDay, name: event.name,callback: newCallback});
                }
                periodArray.forEach((el) => {
                   return  func({id, date: daysCount(startDate, el), name: event.name, callback: newCallback});

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
            return func(event);
        }
    }

    Calendar.setEvent = setEventDecorator(Calendar.setEvent);
}())