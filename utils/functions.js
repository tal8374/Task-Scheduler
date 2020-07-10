const humanInterval = require('human-interval');
const parser = require('cron-parser');

function isHumanInterval(interval) {
    return isNaN(humanInterval(interval)) == false;
}

function getNextTime(time) {
    if (isHumanInterval(time)) {
        return new Date(Date.now() + humanInterval(time));
    } else {
        return parser.parseExpression(time).next();
    }
}

module.exports = {
    isHumanInterval,

    getNextTime
}
