((root, factory) => {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(this)
    } else {
        factory(root)
    }
})(typeof window !== undefined ? window : this, (global) => {
    'use strict'
    var Events = [];
    var started = false;//TODO: uppercase?

    function setEvent(date, event, callback) {

        if (dateHandler(date) < new Date()) {
            console.log("The time you specified has already passed!");
            callback();
            return;
        }

        var newEvent = {
            id: generateId(),
            event,
            date: dateHandler(date),
            callback,
            eventIsDone: false
        };

        if (Events.some(el => el.event === newEvent.event && el.date.toString() === newEvent.date.toString())) {
            console.log("An event with the same name and time already exists");
            return;
        }

        Events.push(newEvent);

        if (!started) {
            console.log('Running');
            started = true;
            timeCheck();
        }
    }

    function timeCheck() {

        if (!Events.length || Events.every(el => el.eventIsDone)) {
            started = false;
            console.log('All events are completed');
            return;
        }
        Events.forEach((el) => {
            if (el.eventIsDone === false && el.date.toString() === new Date().toString()) {
                el.callback();
                el.eventIsDone = true;
            }
        })
        setTimeout(() => {
            timeCheck()
        }, 1000)
    }

    function getEventsList(startDay, endDay) {

        if (!startDay && !endDay) {
            console.log(Events.sort());
        }
        if (startDay && !endDay) {
            Events.forEach((el) => {
                if (el.date.toDateString() === dateHandler(startDay).toDateString()) {
                    console.log(el);
                }
            })
        }
        if (startDay && endDay === 'week') {
            startDay = Date.parse(dateHandler(startDay).toDateString())
            Events.forEach((el) => {
                if (Date.parse(el.date.toDateString()) >= startDay && Date.parse(el.date.toDateString()) <= startDay + 7 * 24 * 60 * 60 * 1000) {
                    console.log(el);
                }
            })
        }
        if (startDay && endDay === 'month') {
            startDay = Date.parse(dateHandler(startDay).toDateString());
            Events.forEach((el) => {
                if (Date.parse(el.date.toDateString()) >= startDay && Date.parse(el.date.toDateString()) <= startDay + 30 * 24 * 60 * 60 * 1000) {
                    console.log(el);
                }
            })
        }
        if (startDay && endDay && endDay !== 'week' && endDay !== 'month') {
            startDay = Date.parse(dateHandler(startDay).toDateString());
            endDay = Date.parse(dateHandler(endDay).toDateString());

            for (var i = startDay; i <= endDay; i = i + 24 * 60 * 60 * 1000) {
                Events.forEach((el) => {
                    if (el.date.toDateString() === new Date(i).toDateString()) {
                        console.log(el);
                    }
                })
            }
        }
    }

    function removeEvent(id) {
        if(id==='all'){
            Events=[];
        }
        Events = Events.filter(el => el.id !== id);
    }

    function changeEvent(id, newEventName, newDate) {
        return Events.find((el) => {
            if (el.id === id) {
                newEventName ? el.event = newEventName : el.event;
                newDate ? el.date = dateHandler(newDate) : el.date;
            }
        })
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

    function generateId(){
        return Math.random().toString(36).substring(6)
    }

    global.Calendar = {
        setEvent,
        removeEvent,
        getEventsList,
        changeEvent,
    }

})

