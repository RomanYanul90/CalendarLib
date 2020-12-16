(function () {

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

    function nextDayDateCreate(currentDay) {
        currentDay = dateHandler(currentDay);
        return new Date(Date.parse(currentDay) + 24 * 60 * 60 * 1000).toLocaleDateString() + " " + new Date(Date.parse(currentDay) + 24 * 60 * 60 * 1000).toTimeString().split(" ")[0]
    }

    function daysCount(startDate, dayOfWeek) {
        var count = 0
        var daysOfWeek=["monday","tuesday","wednesday","thursday","friday",'saturday','sunday']
        var currentDayOfWeek = dateHandler(startDate).getDay()
        dayOfWeek=daysOfWeek.indexOf(dayOfWeek)+1
        if(dayOfWeek>currentDayOfWeek){
            count=dayOfWeek-currentDayOfWeek
        }else {
            count=7-currentDayOfWeek+dayOfWeek
        }
        return new Date(Date.parse(dateHandler(startDate))+count*24*60*60*1000)
    }

    //dayCount('23.12.2020',"monday")=============>"28.12.2020"
    function setEventDecorator(func) {
        return function (date, event, callback, period) {
            if (period === "every day") {
                var newCallback = function () {
                    callback();
                    var nextDay = nextDayDateCreate(date);
                    Calendar.setEvent(nextDay, event, newCallback);
                }
                return func(date, event, newCallback, "every day");
            }
            if (period !== "every day") {
                var arr = period.split(",")
                console.log(daysCount(date,arr[1]))
                // arr.forEach((el) => {
                //     return Calendar.setEvent(daysCount(date, el), event, callback)
                // })
            }
            return func(date, event, callback);
        }
    }

    Calendar.setEvent = setEventDecorator(Calendar.setEvent);
}())