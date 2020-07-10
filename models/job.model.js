const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let jobSchema = new mongoose.Schema({
    name: { type: Schema.Types.String },
    priority: { type: Schema.Types.Number, default: 0 },
    concurrency: { type: Schema.Types.Number },
    isActive: { type: Schema.Types.Boolean, default: true },
    isLocked: { type: Schema.Types.Boolean, default: false },
    isDisabled: { type: Schema.Types.Boolean, default: false },
    lockDate: { type: Schema.Types.Date },
    releaseLockDate: { type: Schema.Types.Date },
    failDate: { type: Schema.Types.Date },
    failReason: { type: Schema.Types.String },
    nextTime: { type: Schema.Types.Date },
    nextTimeExpression: { type: Schema.Types.String },
    isOneTime: { type: Schema.Types.Boolean },
    optionsMD5: { type: Schema.Types.String },
});

module.exports = mongoose.model('Job', jobSchema);