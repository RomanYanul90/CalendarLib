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

export {dateHandler}