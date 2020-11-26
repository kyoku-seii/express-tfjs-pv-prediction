var express = require('express');
var router = express.Router();
const { login } = require('../controller/user')
const { SuccessModel, ErrorModel } = require('../model/resModel')

router.post('/login', function (req, res, next) {
    const { username, password } = req.body
    const result = login(username, password)
    return result.then(data => {
        if (data.username) {
            //返回一个Session 
            req.session.username = data.username
            res.json(new SuccessModel())
            return
        }
        res.json(new ErrorModel('登录失败'))
    })
});

// router.get('/login-test', function (req, res, next) {
//     if (req.session.username) {
//         res.json({
//             errno: 0,
//             msg: 'success'
//         })
//         return
//     }
//     res.json({ errno: -1, msg: 'fail' })
// });

module.exports = router;