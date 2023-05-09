const express = require("express");
const env = require("./config/env"); //환경설정
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const stockCron = require("./cron/stockCron");

const app = express();

const connect = mongoose
    .connect(env.mongoURI, {})
    .then(() => console.log("db connected"))
    .catch((err) => console.log(`db connect fail`));

app.use(cors()); //Cross-Origin Resource Sharing
app.use(bodyParser.urlencoded({ extended: true })); //formdata 받기
app.use(bodyParser.json()); //json 받기

stockCron.cronJobs(); // cron등록

app.use("/api/stock", require("./routes/stock")); //stock route 등록
app.use("/api/daum", require("./routes/daum")); //daum route 등록

app.get("/", (req, res) => {
    res.send("Hello World!");
});

const port = env.serverPort || 5000;
app.listen(port, () => {
    console.log(`backend listening... ${port}`);
});
