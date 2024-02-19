function getCurrentDateTime() {
    const currentDateTime = new Date();

    const year = currentDateTime.getFullYear();
    const month = currentDateTime.getMonth() + 1; // Months are zero-indexed
    const day = currentDateTime.getDate();
    const hours = currentDateTime.getHours();
    const minutes = currentDateTime.getMinutes();
    const seconds = currentDateTime.getSeconds();

    // Add leading zeros manually
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;
    const formattedHours = hours < 10 ? '0' + hours : hours;
    const formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
    const formattedSeconds = seconds < 10 ? '0' + seconds : seconds;

    const formattedDateTime = `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    return formattedDateTime;
}

// Example usage
const currentDateTime = getCurrentDateTime();
console.log('Current Date and Time:', currentDateTime);
