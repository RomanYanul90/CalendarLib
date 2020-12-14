(function () {

    var repeatedEvents = [];
    var started = false;


    function dateHandler(userTime) {

        return new Date().toLocaleDateString() + " " + userTime;

        // console.log(Date.parse(currentDate)+24*60*60*1000)

    }

    Calendar.setRepeatEvent = function (time, event, repeatInterval, callback) {

        var newRepeatedEvent = {
            id: Math.random().toString(36).substring(6),
            event,
            time: typeof (time) == "string" ? new Date(dateHandler(time)) : time,
            repeatInterval,
            callback,
        };

        repeatedEvents.push(newRepeatedEvent)

        if (!started) {
            console.log('Running');
            started = true;
            timeCheck();

        }

        Calendar.getRepeatedEvents = function () {
            console.log(repeatedEvents)
        }

        function timeCheck() {


            repeatedEvents.forEach((el) => {
                if (el.time.toString() === new Date().toString()) {
                    el.callback()
                    var nextDay = new Date(Date.parse(el.time) + 24 * 60 * 60 * 1000);
                    Calendar.setRepeatEvent(nextDay, el.event, el.repeatInterval, el.callback);
                }
            })
            setTimeout(() => {
                timeCheck()
            }, 1000)

        }
    }

}())