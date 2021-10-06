const formatDate = date => {
    const day = `${date.getDate()}`.padStart(2, '0');
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const year = `${date.getFullYear()}`.padStart(2, '0');
    const hours = `${date.getHours()}`.padStart(2, '0');
    const minutes = `${date.getMinutes()}`.padStart(2, '0');
    const seconds = `${date.getSeconds()}`.padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

const getCurrentDate = () => {
    return formatDate(new Date());
};

const getDateFromTimestamp = timestamp => {
    if (!timestamp) return null;
    return formatDate(new Date(timestamp));
};

module.exports = { formatDate, getCurrentDate, getDateFromTimestamp };