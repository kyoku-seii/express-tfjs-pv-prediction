var express = require('express');
var router = express.Router();
const { getDetail, getOutput } = require('../controller/pv')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const loginCheck = require('../middleware/loginCheck')
const normalize = require('../utils/Normalization')

//获取一台pv的详细配置信息
router.get('/detail', loginCheck, function (req, res, next) {
    const id = req.query.id || ''
    const result = getDetail(id)
    return result.then(data => {
        res.json(new SuccessModel(data))
    })
});

//获取pv的历史发电信息
router.get('/output', loginCheck, function (req, res, next) {
    const id = req.query.id || ''
    const result = getOutput(id)
    return result.then(data => {
        res.json(new SuccessModel(data))
    })
});

// 获取能够快速代入机器模型的归一化数据
router.get('/normalizedData', loginCheck, function (req, res, next) {
    const id = req.query.id || ''
    const result = getOutput(id)
    return result.then(data => {
        const result = normalize(data)
        res.json(new SuccessModel(result))
    })
});

module.exports = router;