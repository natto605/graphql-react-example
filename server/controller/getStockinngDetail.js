const rq = require('request-promise');
const { SERVER_ADDRESS } = require('../config');
const qs = require("qs");

const getStockingDetail = async (ctx,next) => {
    const requestData = ctx.request.body;
    const query = ctx.request.query;
    const url = `/api/supplementary/stocking/productAverageWeightedDiscount?${qs.stringify(query)}`;
    const options = {
        url: SERVER_ADDRESS + url ,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: requestData,
        json: true
    };

    let result = await rq(options);
    if(result.code == 0) {
        ctx.body = result;
    } else {
        ctx.body = {
            ...result
        }
    }
};

const getDropDetail = async (ctx,next) => {
    const requestBody = ctx.request.body;
    const query = ctx.request.query;
    const url = `/api/supplementary/stocking/productAverageDrop?${qs.stringify(query)}`;

    const options = {
        url: SERVER_ADDRESS + url,
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        body: requestBody,
        json: true
    };
    let result = await rq(options);

    if(result.code === 0) {
        ctx.body = result;
    } else {
        ctx.body = {...result};
    }

};

module.exports = {
    getStockingDetail,
    getDropDetail
};