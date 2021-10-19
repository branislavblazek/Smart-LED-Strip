const formatDate = (date, return_date = true, return_time = true, separatorDate = '.', separatorTime = ":") => {
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = `${date.getFullYear()}`.padStart(2, '0');

    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    const seconds = `${date.getSeconds()}`.padStart(2, '0');

    const formatted_date = `${day}${separatorDate}${month}${separatorDate}${year}`;
    const formatted_time = `${hours}${separatorTime}${minutes}${separatorTime}${seconds}`

    if (return_date && return_time) return `${formatted_date} ${formatted_time}`;
    if (return_date) return formatted_date;
    if (return_time) return formatted_time;
}

const getDateForLogFile = () => formatDate(new Date(), true, false, '');

const getCurrentDateTime = () => {
    return formatDate(new Date());
};

const getCurrentDate = () => {
    return formatDate(new Date(), true, false);
};

const getDateFromTimestamp = timestamp => {
    if (!timestamp) return null;
    return formatDate(new Date(timestamp));
};

module.exports = {
    formatDate,
    getCurrentDate,
    getCurrentDateTime,
    getDateForLogFile,
    getDateFromTimestamp,
};