(function () {

    const daysOfWeek = ["monday", "tuesday", "wednesday", "thursday", "friday", 'saturday', 'sunday']
    const oneDay = 24 * 60 * 60 * 1000

    function generateId() {
        return Math.random().toString(36).substring(6)
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
        currentDay = dateHandler(currentDay);
        return new Date(Date.parse(currentDay) + days * oneDay).toLocaleDateString() + " " + new Date(Date.parse(currentDay) + days * oneDay).toTimeString().split(" ")[0]
    }

    function daysCount(startDate, dayOfWeek) {
        var count = 0;
        const currentDayOfWeek = dateHandler(startDate).getDay();
        dayOfWeek = daysOfWeek.indexOf(dayOfWeek) + 1//TODO 0-6 0-7 ?!
        if (dayOfWeek > currentDayOfWeek) {
            count = dayOfWeek - currentDayOfWeek;
        } else {
            count = 7 - currentDayOfWeek + dayOfWeek;
        }
        return new Date(Date.parse(dateHandler(startDate)) + count * oneDay).toLocaleDateString() + " " + new Date(Date.parse(dateHandler(startDate)) + count * oneDay).toTimeString().split(" ")[0]
    }

    function setEventDecorator(func) {
        return function (event) {
            if (event.period === "every day") {
                const id = generateId();
                var newCallback = function () {
                    event.callback();
                    var nextDay = nextDayDateCreate(event.date, 1);
                    Calendar.setEvent({id, ...event, date: nextDay, callback: newCallback});
                }
                return func({id, ...event, callback: newCallback});
            }

            if (event.period && event.period !== "every day") {
                var periodArray = [];
                var startDate = event.date
                const id = generateId();

                if (event.period.split('').includes(',')) {
                    event.period.split(',').forEach(el => periodArray.push(el));
                } else {
                    periodArray.push(event.period);
                }

                var newCallback = function () {
                    event.callback();
                    var nextDay = nextDayDateCreate(event.date, 7);
                    // Calendar.setEvent({id, ...event, date: nextDay, callback: newCallback});
                    Calendar.setEvent({id, date: nextDay, event: event.event,callback: newCallback});

                }
                periodArray.forEach((el) => {
                   return  func({id, date: daysCount(startDate, el), event: event.event, callback: newCallback})
                })
                // return func({id, ...event, callback: newCallback});
            }
            return func(event);
        }
    }

    Calendar.setEvent = setEventDecorator(Calendar.setEvent);
}())