var calendar = (function () {

    var events = []
    var started = false

    function setEvent(date, event, callback) {

        if (dateHandler(date) < new Date()) {
            console.log("The time you specified has already passed!")
            return
        }

        var newEvent = {
            event,
            date: dateHandler(date),
            callback,
            eventIsDone: false
        }

        if (events.some(el => el.event === newEvent.event && el.date.toString() === newEvent.date.toString())) {
            console.log("An event with the same name and time already exists")
            return
        }

        events.push(newEvent)

        if (!started) {
            console.log('Running')
            started = true;
            timeCheck();
        }
    }

    function timeCheck() {
        if (!events.length || events.every(el => el.eventIsDone)) {
            started = false;
            console.log('All events are completed')
            return
        }

        events.forEach((el) => {
            if (el.eventIsDone === false && el.date.toString() === new Date().toString()) {
                el.callback()
                el.eventIsDone = true
            }
        })

        setTimeout(() => {
            timeCheck()
        }, 1000)
    }

    function dateHandler(userDate) {
        var time = userDate.split(" ")[1]
        var date = userDate.split(" ")[0].split('.')
        date[1] = date.splice(0, 1, date[1])[0]
        if (time) {
            return new Date(`${date.join('.')} ${time}`)
        } else {
            return new Date(`${date.join('.')}`)
        }
    }

    function getEventsList(startDay, endDay) {
        if (!startDay && !endDay) {
            console.log(events)
        }
        if (startDay && !endDay) {
            events.forEach((el) => {
                if (el.date.toDateString() === dateHandler(startDay).toDateString()) {
                    console.log(el)
                }
            })
        }
        if (startDay && endDay) {
            startDay = Date.parse(dateHandler(startDay).toDateString())
            endDay = Date.parse(dateHandler(endDay).toDateString())

            for (var i = startDay; i <= endDay; i = i + 24 * 60 * 60 * 1000) {
                events.forEach((el) => {
                    if (el.date.toDateString() === new Date(i).toDateString()) {
                        console.log(el)
                    }
                })
            }
        }
    }

    function removeEvent(eventToRemove, date) {
        events = events.filter(el => el.event !== eventToRemove && el.date.toString() !== dateHandler(date).toString())
    }

    function changeEvent(event, date, newName = event, newDate = date) {
        return events.find((el) => {
            if (el.event === event && el.date.toString() === dateHandler(date).toString()) {
                el.event = newName
                el.date = dateHandler(newDate)
            }
        })
    }

    return {
        setEvent,
        removeEvent,
        getEventsList,
        changeEvent
    }

})()

