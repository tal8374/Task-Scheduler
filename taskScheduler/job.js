export class Job {

    //support:
    // const weeklyReport = agenda.create('send email report', {to: 'example@example.com'});
    // await agenda.start();
    // await weeklyReport.repeatEvery('1 week').save();
    repeatEvery(interval, [options]) {

    }

    //job.repeatAt('3:30pm');
    //Specifies a time when the job should repeat.
    repeatAt(time) {

    }

    //job.schedule('tomorrow at 6pm');
    //Specifies the next time at which the job should run.
    schedule(time) {

    }
    
    //job.priority('low');
    //Specifies the priority weighting of the job. 
    priority(priority) {
        
    }

    //job.unique({'data.type': 'active', 'data.userId': '123', nextRunAt(date)});
    //Ensure that only one instance of this job exists with the specified properties
    unique(properties, [options]) {

    }

    //Sets job.attrs.failedAt to now, and sets job.attrs.failReason to reason
    //job.fail('insufficient disk space');
    //job.fail(new Error('insufficient disk space'));
    fail(reason) {

    }

    //await job.remove();
    //Removes the job from the database.
    remove() {

    }

    //Disables the job. Upcoming runs won't execute.
    disable() {

    }

    //Enables the job if it got disabled before. Upcoming runs will execute.
    enable() {

    }

    save() {

    }

}