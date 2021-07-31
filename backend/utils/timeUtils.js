const getCurrentDate = () => {
    const JSdate = new Date();
    const day = `${JSdate.getDate()}`.padStart(2, '0');
    const month = `${JSdate.getMonth() + 1}`.padStart(2, '0');
    const year = `${JSdate.getFullYear()}`.padStart(2, '0');
    const hours = `${JSdate.getHours()}`.padStart(2, '0');
    const minutes = `${JSdate.getMinutes()}`.padStart(2, '0');
    const seconds = `${JSdate.getSeconds()}`.padStart(2, '0');
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
};

module.exports = { getCurrentDate };