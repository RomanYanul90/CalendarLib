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

    function setEvent(date, event, callback) {//TODO id?

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

    function sortedByDateEventsList(arr) {
        return arr.sort((a, b) => {
            return a.date - b.date
        })
    }

    function getEventsList(startDay, endDay) {
        const oneDay = 24 * 60 * 60 * 1000;
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        const oneMonth = 30 * 24 * 60 * 60 * 1000;
        var result = [];
        if (!startDay && !endDay) {
            result = Events
        }
        if (startDay && !endDay) {
            Events.forEach((el) => {
                if (el.date.toDateString() === dateHandler(startDay).toDateString()) {
                    result.push(el);
                }
            })
        }
        if (startDay && endDay === 'week') {
            startDay = Date.parse(dateHandler(startDay).toDateString())
            Events.forEach((el) => {
                if (Date.parse(el.date.toDateString()) >= startDay && Date.parse(el.date.toDateString()) <= startDay + oneWeek) {
                    result.push(el);
                }
            })
        }
        if (startDay && endDay === 'month') {
            startDay = Date.parse(dateHandler(startDay).toDateString());
            Events.forEach((el) => {
                if (Date.parse(el.date.toDateString()) >= startDay && Date.parse(el.date.toDateString()) <= startDay + oneMonth) {
                    result.push(el);
                }
            })
        }
        if (startDay && endDay && endDay !== 'week' && endDay !== 'month') {
            startDay = Date.parse(dateHandler(startDay).toDateString());
            endDay = Date.parse(dateHandler(endDay).toDateString());

            for (var i = startDay; i <= endDay; i = i + oneDay) {
                Events.forEach((el) => {
                    if (el.date.toDateString() === new Date(i).toDateString()) {
                        result.push(el);
                    }
                })
            }
        }
        console.log(sortedByDateEventsList(result));
    }

    function removeEvent(eventToRemove) {
        if (typeof (eventToRemove) === "object" && eventToRemove.id) {
            Events = Events.filter(el => el.id !== eventToRemove.id);

        }
        if (typeof (eventToRemove) === "object" && eventToRemove.name) {
            Events = Events.filter(el => el.event !== eventToRemove.name);
        }
        if (eventToRemove === 'all') {
            Events = [];
        }
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

    function generateId() {
        return Math.random().toString(36).substring(6)
    }

    global.Calendar = {
        setEvent,
        removeEvent,
        getEventsList,
        changeEvent,
    }

})

