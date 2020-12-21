(function (){
    function setReminder() {
        return function (event) {
            console.log(event)
        }
    }
    Calendar.reminder = setReminder();

}())

// Calendar.remind('id','01:00:00',function (){alert('qwe')})