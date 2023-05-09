const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

//schema 구성

const upjongSchema = mongoose.Schema(
    {
        stockCode: {
            type: String,
            trim: true,
            maxlength: 12,
            unique: true,
        },
        name: {
            type: String,
            trim: true,
        },
        market: {
            type: String,
            trim: true,
        },
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);
const Upjong = mongoose.model("Upjong", upjongSchema);

const themeSchema = mongoose.Schema(
    {
        themeCode: {
            type: Number,
            unique: true,
        },
        name: {
            type: String,
            unique: true,
            trim: true,
        },
        changeRate: Number, //전일대비 등락율
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);
themeSchema.plugin(mongoosePaginate);
const Theme = mongoose.model("Theme", themeSchema);

const consensusYearSchema = mongoose.Schema(
    {
        stock: { type: mongoose.Types.ObjectId, ref: "Stock", require: true },
        year: {
            type: Number,
            require: true,
        },
        op: Number,
        opr: Number,
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);
consensusYearSchema.index({ stock: 1, year: 1 }, { unique: true });
consensusYearSchema.plugin(mongoosePaginate);
const ConsensusYear = mongoose.model("ConsensusYear", consensusYearSchema);

const consensusQuarterSchema = mongoose.Schema(
    {
        stock: { type: mongoose.Types.ObjectId, ref: "Stock", require: true },
        year: {
            type: Number,
            require: true,
        },
        quarter: {
            type: Number,
            require: true,
        },
        op: Number,
        opr: Number,
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);
consensusQuarterSchema.index(
    { stock: 1, year: 1, quarter: 1 },
    { unique: true }
);
consensusQuarterSchema.plugin(mongoosePaginate);
const ConsensusQuarter = mongoose.model(
    "ConsensusQuarter",
    consensusQuarterSchema
);

const stockSchema = mongoose.Schema(
    {
        stockCode: {
            type: String,
            trim: true,
            maxlength: 10,
            unique: true,
        }, //종목코드
        name: {
            type: String,
            trim: true,
        }, //종목명
        upjong: { type: mongoose.Types.ObjectId, ref: "Upjong", require: true }, //업종ref
        listingDate: { type: String, maxlength: 10 }, //상장일
        marketCap: Number, //시가총액
        companySummary: String, //회사개요
        debtRatio: Number, //부채비율
        foreignRatio: Number, //외국인보유비율
        pbr: Number, //pbr
        per: Number, //per
        sectorPer: Number, //daum.net기준
        dividendRate: Number, //배당율
        changeRate: Number, //등락율
        rsi: Number, //일봉 rsi
        bpSignal: Number, //일목시그널 : 1 : 상승, 0 : 하향
        cpSignal: Number, //전환시그널 : 1 : 상승, 0 : 하향
        bpSingnalChangeDays: Number, //일목전환후 경과일수
        tradePrice: Number,
        accVolumeRate: Number, //전일대비 거래량 증가율
        accTradePrice: Number, //거래대금
        favorite: Boolean, //즐겨찾기한 종목
        my: Boolean, //내가산 종목
        state: { type: mongoose.Schema.Types.Mixed }, //종목상태
        themes: [{ type: mongoose.Types.ObjectId, ref: "Theme" }], //테마주
        consensusYears: [
            { type: mongoose.Types.ObjectId, ref: "ConsensusYear" },
        ], //컨센서스년도
        consensusQuarters: [
            { type: mongoose.Types.ObjectId, ref: "ConsensusQuarter" },
        ], //컨센서스 분기
    },
    {
        timestamps: { currentTime: () => Date.now() },
    }
);
stockSchema.plugin(mongoosePaginate);
const Stock = mongoose.model("Stock", stockSchema);

module.exports = {
    Upjong,
    Theme,
    Stock,
    ConsensusYear,
    ConsensusQuarter,
};
