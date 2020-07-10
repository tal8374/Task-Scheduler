const humanInterval = require('human-interval');

const JobModel = require('../models/job.model');

const Job = require('./job');

const { getNextTime } = require('../utils/functions');


const defaultOptions = {
    //Takes a string interval which can be either a traditional javascript number, or a string such as 3 minutes
    processEvery: '5 seconds',
    //Default time to unlock the job, all jobs should be done before that time.
    unLockDefault: '5 minutes',
    //Takes a number which specifies the max number of jobs that can be running at any given moment. By default it is 20.
    maxConcurrency: 20,
    //number maximum number of that job that can be running at once (per instance of agenda)
    concurrency: 1,
    //Number of multiple jobs every time when getting jobs
    multipleJobs: 3,
    // Takes a number which specifies the max number jobs that can be locked at any given moment. By default it is 0 for no max.
    lockLimit: 0,
}

module.exports = class TaskScheduler {

    constructor(options = defaultOptions) {
        this.options = { ...defaultOptions, ...options };
        this.lockedJobs = [];
        this.runningJobs = [];
        this.jobs = []; // {name, functionJob}
    }

    // agenda.define('reset password', async job => {
    //     // Etc
    //   });
    //Defining the task and passing the function.
    async define(taskName, options, func) {
        if (!func) {
            func = options
            options = {};
        }

        let newJob = new Job(taskName, options, func);
        newJob = await newJob.save();
        this.jobs.push(newJob);
    }

    //await agenda.start();
    //Starting the task scheduler. Running a process every time.
    async start() {
        await this.runStartTasker();
        setInterval(async () => {
            await this.runStartTasker();
        }, getNextTime(this.options.processEvery) - Date.now());
    }

    async runStartTasker() {
        let jobs = await this.getJobs();
        jobs.forEach(currentJob => {
            this.jobs.find(job => job._id.toString() == currentJob._id.toString()).func();
        });
    }

    async getJobs() {
        let lockDate = new Date();
        await JobModel.updateMany(
            {
                _id: { $in: this.jobs.map(job => job._id) },
                $or: [
                    { isLocked: false },
                    { lockDate: { $gte: new Date(Date.now() - humanInterval(this.options.unLockDefault)) } }
                ]
            },
            { "$set": { isLocked: true, lockDate: lockDate } },
            { returnNewDocument: true },
        );

        return await JobModel.find({
            _id: { $in: [this.jobs.map(job => job._id)] },
            isLocked: true,
            lockDate: lockDate
        })
    }

    //await agenda.every('3 minutes', 'delete old users');
    //await agenda.every('*/3 * * * *', 'delete old users');
    every(interval, taskName, payload) {

    }

    //agenda.schedule('tomorrow at noon', 'printAnalyticsReport', {userCount: 100});
    //agenda.schedule('tomorrow at noon', ['printAnalyticsReport', 'sendNotifications', 'updateUserRecords']);
    //Defining a specific date with running jobs at that time
    schedule(startTime, taskName, payload) {

    }

    //agenda.create('send email report', {to: 'example@example.com'})
    //Responsible on creating a job
    create(taskName, payload) {

    }

    //Defines the interval which the tasker will check the DB if there are new jobs
    processEvery(interval) {

    }

    //Schedules a job to run name once immediately.
    //agenda.now('do the hokey pokey');
    now(taskName) {

    }

    //Lets you query (then sort, limit and skip the result) all of the jobs in the agenda job's database.
    //const jobs = await agenda.jobs({name: 'printAnalyticsReport'}, {data:-1}, 3, 1);
    jobs() {

    }

    //const numRemoved = await agenda.cancel({name: 'printAnalyticsReport'});
    //Cancels any jobs matching the passed mongodb-native query, and removes them from the database. Returns a Promise resolving to the number of cancelled jobs, or rejecting on error
    cancel() {

    }

    //Removes all jobs in the database without defined behaviors.
    //const numRemoved = await agenda.purge();
    purge() {

    }

    //await agenda.stop();
    //Stops the job queue processing. Unlocks currently running jobs.
    stop() {

    }

    //agenda.on('start'
    //agenda.on('complete',
    //agenda.on('success:send email'
    //agenda.on('fail:send email',
    //listens to events (finished jobs for example)
    on(eventName) {

    }

}