const express = require("express");
const {
    Stock,
    Theme,
    ConsensusYear,
    ConsensusQuarter,
} = require("../models/Stock");
const router = express.Router();
const mongoosePaginate = require("mongoose-paginate-v2");
var { ObjectId } = require("mongodb");

router.post("/info", async (req, res) => {
    const query = req.body;
    Stock.findOne({ _id: query._id })
        .populate("upjong")
        .populate("themes")
        .then((s) => res.status(200).json(s));
});

module.exports = router;
