(function () {

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

    function nextDayDateCreate(currentDay) {
        currentDay = dateHandler(currentDay);
        return new Date(Date.parse(currentDay) + 24 * 60 * 60 * 1000).toLocaleDateString() + " " + new Date(Date.parse(currentDay) + 24 * 60 * 60 * 1000).toTimeString().split(" ")[0]
    }

    function setEventDecorator(func) {
        return function () {
            if (Object.values(arguments).includes("every day")) {
                var clonedArgs = [...arguments]
                clonedArgs[0]=nextDayDateCreate(clonedArgs[0])
                // console.log(nextDayDateCreate(clonedArgs[0]))
                arguments[2] = function () {
                    setInterval(func(...clonedArgs), 24 * 60 * 60 * 1000)
                    clonedArgs[2]()
                }
                return func(...arguments)
            }
            return func(...arguments)
        }
    }

    Calendar.setEvent = setEventDecorator(Calendar.setEvent)
}())