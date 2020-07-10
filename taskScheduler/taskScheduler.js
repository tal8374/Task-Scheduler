export class TaskScheduler {

    constructor() {
        this.lockedJobs = []
        this.runningJobs = []
    }

    // agenda.define('reset password', async job => {
    //     // Etc
    //   });
    //Defining the task and passing the function.
    define(taskName, job) {

    }

    //Takes a number which specifies the max number jobs that can be locked at any given moment. By default it is 0 for no max. 
    //agenda.lockLimit(0);
    lockLimit(lockLimitSize) {

    }

    //await agenda.start();
    //Starting the task scheduler. Running a process every time.
    start() {
        
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