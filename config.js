const { DEVELOPMENT, PRODUCTION } = require('./const')

module.exports = {
    ENV: process.env.ENV == DEVELOPMENT ? DEVELOPMENT : PRODUCTION,
    mongo_url: 'mongodb://localhost:27017/task-scheduler'
}
