function setDate(date, time,event) {
    var currentDay = new Date().getDate()
    var currentMonth = new Date().getMonth() + 1
    var currentYear = new Date().getFullYear()
    var currentHour = new Date().getHours()
    var currentMin = new Date().getMinutes()

    currentDay > 10 ? currentDay : currentDay = '0' + currentDay
    currentMonth > 10 ? currentMonth : currentMonth = '0' + currentMonth
    currentHour > 10 ? currentHour : currentHour = '0' + currentHour
    currentMin > 10 ? currentMin : currentMin = '0' + currentMin

    var currentDate = `${currentDay}.${currentMonth}.${currentYear}`
    var currentTime = `${currentHour}:${currentMin}`
    // console.log(currentDate,currentTime)

    if (date === currentDate && time === currentTime) {
        alert(`It is ${event} time!`)
        return
    }
    setTimeout(()=>{
        setDate(date, time)
    }, 1000)
}

// setDate('03.12.2020', '21:48','Mike B-Day')



