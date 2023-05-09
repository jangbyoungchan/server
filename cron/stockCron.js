const cron = require("node-cron");
var { ObjectId } = require("mongodb");
const {
    Upjong,
    Theme,
    Stock,
    ConsensusYear,
    ConsensusQuarter,
} = require("../models/Stock");

const { error } = require("console");
/**
 * second(optional) : 0-59,
 * minute : 0-59, hour : 0-23, day of month : 1-31, month : 1-12 (or names), day of week	0-7 (or names, 0 or 7 are sunday)
 */

const cronJobs = () => {
    const cronTest = cron.schedule("0 1 * * *", () => {
        console.log("cronTest ....");
    });

    cronTest.start();
};

module.exports = {
    cronJobs,
};
