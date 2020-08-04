export {getCurrentDate}

function getCurrentDate(date) {
    let parsedDate = new Date(date);
    let day = parsedDate.getDate();
    let month = parsedDate.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    };
    if (day < 10) {
        day = "0" + day;
    }
    let year = parsedDate.getFullYear();
    return year + "-" + month + "-" + day;
  }