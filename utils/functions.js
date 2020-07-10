const humanInterval = require('human-interval');
const parser = require('cron-parser');

export function isHumanInterval(interval) {
    return isNaN(humanInterval(interval)) == false;
}

export function getNextTime(time) {
    if (isHumanInterval(time)) {
        return new Date(Date.now() + humanInterval(time));
    } else {
        return parser.parseExpression(time).next();
    }
}
