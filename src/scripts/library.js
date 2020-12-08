// var calendar = {
//     events: [],
//     dateValidator: function () {
//         var currentDay = new Date().getDate()
//         var currentMonth = new Date().getMonth() + 1
//         var currentYear = new Date().getFullYear()
//         var currentHour = new Date().getHours()
//         var currentMin = new Date().getMinutes()
//
//         currentDay > 10 ? currentDay : currentDay = '0' + currentDay
//         currentMonth > 10 ? currentMonth : currentMonth = '0' + currentMonth
//         currentHour > 10 ? currentHour : currentHour = '0' + currentHour
//         currentMin > 10 ? currentMin : currentMin = '0' + currentMin
//
//         return [`${currentDay}.${currentMonth}.${currentYear}`, `${currentHour}:${currentMin}`]
//     },
//     setEvent: function (date, time, event) {
//         var newEvent = {
//             event,
//             date,
//             time
//         }
//         if (!this.events.includes(newEvent)) {
//             this.events.push(newEvent)
//         }
//
//         [currentDate, currentTime] = this.dateValidator()
//
//         // console.log(currentDate, currentTime)
//
//         if (date === currentDate && time === currentTime) {
//             console.log(`It is ${event} time!`)
//             return
//         }
//         setTimeout(() => {
//             this.setEvent(date, time,event)
//         }, 1000)
//
//     },
//     removeEvent: function (eventToRemove) {
//         this.events=this.events.filter(el=>eventToRemove!==el.event)
//     },
//     getEvents: function () {
//         console.log(this.events)
//     }
// }
//
// // calendar.setEvent('06.12.2020','19:05','new year')
// calendar.getEvents()

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

var events=[]

function setEvent(date, event, isInEventsList) {

    var newEvent = {
        event,
        date,
    };

    if (!isInEventsList) {
        events.push(newEvent)
    }

    var currentTime = dateValidator()

    if (date === currentTime) {
        console.log(`It is ${event} time!`)
        return
    }

    setTimeout(() => {
        setEvent(date, event, true)
    }, 1000)

}

setEvent('08.12.2020 20:06','new year')