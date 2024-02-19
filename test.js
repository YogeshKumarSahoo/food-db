function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Months are zero-indexed
    const day = currentDate.getDate();

    // Add leading zeros manually
    const formattedMonth = month < 10 ? '0' + month : month;
    const formattedDay = day < 10 ? '0' + day : day;

    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;
    return formattedDate;
}

// Example usage
const currentDate = getCurrentDate();
console.log('Current Date:', currentDate);
