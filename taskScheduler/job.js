var md5 = require('md5');

const JobModel = require('../models/job.model');
const { getNextTime } = require('../utils/functions');

module.exports = class Job {

    constructor(taskName, options, func) {
        this.taskName = taskName;
        this.options = options;
        this.func = func;
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
    async fail(reason) {
        if (!this._id)
            return;

        await JobModel.update({ _id: this._id }, { $set: { failReason: reason.toString, failDate: new Date() } });
    }

    //await job.remove();
    //Removes the job from the database.
    async remove() {
        if (!this._id)
            return;

        await JobModel.remove({ _id: this._id });
    }

    //Disables the job. Upcoming runs won't execute.
    async disable() {
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
        let result = await JobModel.findOne({ name: this.taskName, optionsMD5: md5(JSON.stringify(this.options)) });
        if (!result) {
            let newJob = new JobModel({ name: this.taskName, optionsMD5: md5(JSON.stringify(this.options)) });
            result = await newJob.save();
        }
        this._id = result._id;
        return this;
    }

}