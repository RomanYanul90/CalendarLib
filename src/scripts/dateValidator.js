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

    function dateHandler(userDate){
        var time = userDate.split(" ")[1]
        var date = userDate.split(" ")[0].split('.')
        date[1] = date.splice(0,1, date[1])[0]
        if(time){
            return  new Date(`${date.join('.')} ${time}`)
        }else{
            return  new Date(`${date.join('.')}`)
        }
    }

    function getEventsListByDay(day) {
        var result = events.map((el)=>{
            if(el.date.toDateString()===dateHandler(day).toDateString()){
                return el
            }
        })
        console.log(result)
    }

    function getEventsList() {

        console.log(events)
    }

    function removeEvent(eventToRemove) {
        events = events.filter(el => el.event !== eventToRemove)
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
        getEventsListByDay,
        changeEvent
    }

})()
