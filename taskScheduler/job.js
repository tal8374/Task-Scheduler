const JobModel = require('../models/job.model');
const { getNextTime } = require('../utils/functions');

export class Job {

    constructor(taskName, options) {
        this.taskName = taskName;
        this.options = options;
    }

    //support:
    // const weeklyReport = agenda.create('send email report', {to: 'example@example.com'});
    // await agenda.start();
    // await weeklyReport.repeatEvery('1 week').save();
    repeatEvery(interval) {
        this.nextTimeExpression = interval;
        this.nextTime = getNextTime(interval);
        this.isOneTime = false;
    }

    //job.repeatAt('2 minute');
    //Specifies a time when the job should repeat.
    repeatAt(time) {
        this.nextTime = getNextTime(time);
        this.isOneTime = true;
    }

    //job.schedule('tomorrow at 6pm');
    //Specifies the next time at which the job should run.
    schedule(time) {
        this.nextTimeExpression = time;
        this.nextTime = getNextTime(time);
        this.isOneTime = false;
    }

    //job.priority('low');
    //Specifies the priority weighting of the job. 
    priority(priority) {
        this.priority = priority;
    }

    //Sets job.attrs.failedAt to now, and sets job.attrs.failReason to reason
    //job.fail('insufficient disk space');
    //job.fail(new Error('insufficient disk space'));
    fail(reason) {
        if (!this._id)
            return;

        await JobModel.update({ _id: this._id }, { $set: { failReason: reason.toString, failDate: new Date() } });
    }

    //await job.remove();
    //Removes the job from the database.
    remove() {
        if (!this._id)
            return;

        await JobModel.remove({ _id: this._id });
    }

    //Disables the job. Upcoming runs won't execute.
    disable() {
        if (!this._id)
            return;

        await JobModel.update({ _id: this._id }, { $set: { isDisabled: true } });
    }

    //Enables the job if it got disabled before. Upcoming runs will execute.
    async enable() {
        if (!this._id)
            return;

        await JobModel.update({ _id: this._id }, { $set: { isDisabled: false } });
    }

    async save() {
        JobModel.update({ taskName: this.taskName, options: this.options }, { taskName: this.taskName, options: this.options });
        let result = JobModel.findOne({ taskName: this.taskName, options: this.options }, { _id: 1 });
        this._id = result._id;
    }

}