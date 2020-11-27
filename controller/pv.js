const { exec } = require('../db/mysql')
const xss = require('xss')

const getDetail = (id) => {
    const sql = `select * from pv where id='${id}'`
    return exec(sql).then(row => {
        return row[0]
    })
}

const getOutput = (id) => {
    const sql = `select * from output where pvid='${id}'`
    return exec(sql).then(row => {
        return row
    })
}

const getTest = (id) => {
    const sql = `select * from test where pvid='${id}'`
    return exec(sql).then(row => {
        return row
    })
}


module.exports = { getDetail, getOutput, getTest }