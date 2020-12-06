function dateValidator() {

    var currentDay = new Date().getDate()
    var currentMonth = new Date().getMonth() + 1
    var currentYear = new Date().getFullYear()
    var currentHour = new Date().getHours()
    var currentMin = new Date().getMinutes()

    currentDay > 10 ? currentDay : currentDay = '0' + currentDay
    currentMonth > 10 ? currentMonth : currentMonth = '0' + currentMonth
    currentHour > 10 ? currentHour : currentHour = '0' + currentHour
    currentMin > 10 ? currentMin : currentMin = '0' + currentMin

    return [`${currentDay}.${currentMonth}.${currentYear}`, `${currentHour}:${currentMin}`]
}



var calendar = function () {

    var events = []

    function setEvent(date, time, event, check) {

        var newEvent = {
            event,
            date,
            time
        };

        if (!check) {
            events.push(newEvent)
        }

        [currentDate, currentTime] = dateValidator()

        if (date === currentDate && time === currentTime) {
            alert(`It is ${event} time!`)
            return
        }
        setTimeout(() => {
            setEvent(date, time, event, 1)
        }, 1000)

    }

    function eventsList() {
        console.log(events)
    }

    function removeEvent(event) {
        events = events.filter((el) => {
            return el.event !== event
        })
        console.log(events)
    }

    return {
        setEvent,
        eventsList,
        removeEvent
    }

}()

// calendar.setEvent('06.12.2020','19:16','new year')
// calendar.setEvent('06.12.2020','19:17','new year 2')
// // calendar.removeEvent('new year')
//
// calendar.eventsList()
// eventsList()


