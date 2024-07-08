export function convertTo12HourFormat(timeString) {
    // Splitting the time string into hours and minutes
    var timeParts = timeString.split(":");
    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);

    // Determining AM or PM
    var period = hours >= 12 ? 'PM' : 'AM';

    // Converting hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Formatting minutes with leading zero if necessary
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Constructing the formatted time string
    var formattedTime = hours + ':' + minutes + ' ' + period;

    return formattedTime;
}