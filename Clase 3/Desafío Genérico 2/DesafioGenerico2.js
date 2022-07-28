const moment = require("moment");

let today = moment();
let birthday = moment("19991208", "YYYYMMDD");
let days = today.diff(birthday, 'days');
let years = today.diff(birthday, 'years');
console.log(`Desde mi nacimiento han pasado ${days} días.`);
console.log(`Desde mi nacimiento han pasado ${years} años.`);