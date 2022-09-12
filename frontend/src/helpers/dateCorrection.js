export function dateCorrection(string) {
    // accepts date from form input in YYYY-MM-DD format (ex: 2022-01-12)
    let date = new Date(string) // date = Tue Jan 11 2022 18:00:00 GMT-0600 (Central Standard Time)

    date.setDate(date.getDate() + 2) // date = Thu Jan 13 2022 18:00:00 GMT-0600 (Central Standard Time)

    let year = date.getFullYear() // 2022
    let month = date.getMonth() + 1 // 1  (months are indexed at 0, hence the +1)
    let day = date.getDate() // 13

    let newDateString = year + "-" +
        month.toString().padStart(2, '0') + "-" +
        day.toString().padStart(2, '0'); // 2022-01-13

    return newDateString
}