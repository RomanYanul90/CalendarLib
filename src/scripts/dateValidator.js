var calendar = (function () {

    var events = []
    var started = false

    function setEvent(date, event, callback) {

        if (new Date(datePreparation(date)) < new Date()) {
            console.log("The time you specified has already passed!")
            return
        }

        var newEvent = {
            event,
            date: new Date(datePreparation(date)),
            callback,
            eventIsDone: false
        }

        if (events.some(el => el.event === newEvent.event && el.date.toString() === newEvent.date.toString())) {
            console.log("An event with the same name and time already exists")
            return
        }

        // if(events.some(el=>el.event===event && el.date===new Date(datePreparation(date)).toString() )){
        //     console.log("An event with the same name and time already exists")
        //     return
        // }

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

    function datePreparation(userDate) {
        var time = userDate.split(" ")[1]
        var date = userDate.split(" ")[0].split('.')
        date[1] = date.splice(0, 1, date[1])[0]
        return `${date.join('.')} ${time}`
    }

    function getEventsList(day) {
        var result = events.map((el)=>{
            if(el.date.toDateString()===new Date(datePreparation(day)).toDateString()){
                return el
            }
        })
        console.log(result)
    }
    // function getEventsList() {
    //
    //     console.log(events)
    // }


    function removeEvent(eventToRemove) {
        events = events.filter(el => el.event !== eventToRemove)
    }

    function changeEvent(event, date, newName = event, newDate = date) {
        return events.find((el) => {
            if (el.event === event && el.date.toString() === new Date(datePreparation(date)).toString()) {
                el.event = newName
                el.date = new Date(datePreparation(newDate))
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
