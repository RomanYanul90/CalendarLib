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

    return `${currentDay}.${currentMonth}.${currentYear} ${currentHour}:${currentMin}`
}

var calendar = (function () {

    var events = []
    var started = false

    function setEvent(date, event, callback){

        var newEvent={
            event,
            date,
            callback,
            eventIsDone: false
        }

        events.push(newEvent)

        if (!started) {
            console.log('Running')
            started = true;
            timeCheck();
        }
    }

    function timeCheck(){
        if (!events.length || events.every(el => el.eventIsDone)) {
            started = false;
            console.log('All events are completed')
            return
        }

        var currentTime=dateValidator()

        events.forEach((el)=>{
            if(el.eventIsDone === false && el.date===currentTime){
                el.callback()
                el.eventIsDone = true
            }
        })

        setTimeout(()=>{timeCheck()},1000)
    }

    function getEventsList(){
        console.log(events)
    }

    function removeEvent(eventToRemove) {
        events = events.filter(el => el.event !== eventToRemove)
    }

    function changeEvent(event,newDate,newName){
       return events.find((el)=>{if(el.event===event){
            el.event=newName
            el.date=newDate
        }})
    }

    return {
        setEvent,
        removeEvent,
        getEventsList,
        changeEvent
    }

})()
