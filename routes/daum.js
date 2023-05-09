const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/chart", (req, res) => {
    var options = {
        method: "GET",
        url: req.body.fetchUrl,
        params: req.body.params,
        headers: {
            Accept: "*/*",
            "User-Agent": "Thunder Client (https://www.thunderclient.com)",
            Referer: "req.body.referer",
        },
    };

    axios
        .request(options)
        .then((resp) => {
            return res.status(200).json({
                success: true,
                result: resp.data.data.map((x) => [
                    x.date,
                    null,
                    null,
                    null,
                    x.tradePrice,
                ]),
            });
        })
        .catch((err) => {
            return res.json({ success: false, error: err });
        });
});

module.exports = router;
