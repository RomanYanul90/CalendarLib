(function (root, factory) {
    if (typeof module === 'object' && module.exports) {
        module.exports = factory(this)
    } else {
        factory(root)
    }
})(typeof window !== undefined ? window : this, function (global) {
    'use strict'
    var Events = [];
    var started = false;

    function setEvent(event) {

        if (dateHandler(event.date) < new Date()) {
            console.log("The time you specified has already passed!");
            event.callback();
            return;
        }

        var newEvent = {
            id: event.id ? event.id : generateId(),
            date: dateHandler(event.date),
            eventName: event.name,
            eventIsDone: false,
            callback: event.callback
        };

        if (Events.some(function (el) {
            if (el.eventName === newEvent.eventName && el.date.toString() === newEvent.date.toString()) {
                return true;
            }
        })) {
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

        if (!Events.length || Events.every(function (el) {
            if (el.eventIsDone) {
                return true
            }
        })) {
            started = false;
            console.log('All events are completed');
            return;
        }
        Events.forEach(function (el) {
            if (el.eventIsDone === false && el.date.toString() === new Date().toString()) {
                el.callback();
                el.eventIsDone = true;
            }
        })
        setTimeout(function () {
            timeCheck()
        }, 1000)
    }

    function sortedByDateEventsList(arr) {
        return arr.sort(function (a, b) {
            return a.date - b.date;
        })
    }

    function getEventsList(startDay, endDay) {
        var oneDay = 24 * 60 * 60 * 1000;
        var oneWeek = 7 * 24 * 60 * 60 * 1000;
        var oneMonth = 30 * 24 * 60 * 60 * 1000;
        var result = [];
        var parsedStartDay;

        if(startDay){
            parsedStartDay = Date.parse(dateHandler(startDay).toDateString());
        }

        if (!startDay && !endDay) {
            result = Events.map(function (el) {
                return el
            });
        }
        if (startDay && !endDay) {
            Events.forEach(function (el) {
                if (el.date.toDateString() === dateHandler(startDay).toDateString()) {
                    result.push(el);
                }
            })
        }

        if (startDay && endDay === 'week') {
            Events.forEach(function (el) {
                if (Date.parse(el.date.toDateString()) >= parsedStartDay && Date.parse(el.date.toDateString()) <= parsedStartDay + oneWeek) {
                    result.push(el);
                }
            })
        }
        if (startDay && endDay === 'month') {
            Events.forEach(function (el) {
                if (Date.parse(el.date.toDateString()) >= parsedStartDay && Date.parse(el.date.toDateString()) <= parsedStartDay + oneMonth) {
                    result.push(el);
                }
            })
        }
        if (startDay && endDay && endDay !== 'week' && endDay !== 'month') {
            var parsedEndDay = Date.parse(dateHandler(endDay).toDateString());

            for (var i = parsedStartDay; i <= parsedEndDay; i = i + oneDay) {
                Events.forEach(function (el) {
                    if (el.date.toDateString() === new Date(i).toDateString()) {
                        result.push(el);
                    }
                })
            }
        }
        return (sortedByDateEventsList(result));
    }

    function removeEvent(id) {
        var result = [];

        if (id === "all") {
            Events = [];
        } else {
            Events.forEach(function (el) {
                if (el.id !== id) {
                    result.push(el);
                }
            })
            Events = result;
        }

    }

    function changeEvent(id, newEventName, newDate) {
        return Events.forEach(function (el) {
            if (el.id === id) {
                newEventName ? el.eventName = newEventName : el.eventName;
                newDate ? el.date = dateHandler(newDate) : el.date;
            }
        })
    }

    function dateHandler(userDate) {
        var time = userDate.split(" ")[1];
        var date = userDate.split(" ")[0].split('/');
        date[1] = date.splice(0, 1, date[1])[0];
        if (time) {
            return new Date(date.join('/') + ' ' + time);
        } else {
            return new Date(date.join('/'));
        }
    }

    function generateId() {
        return Math.random().toString(36).substring(6);
    }

    global.Calendar = {
        setEvent: setEvent,
        removeEvent: removeEvent,
        getEventsList: getEventsList,
        changeEvent: changeEvent,
    }

})