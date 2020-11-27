const { SuccessModel, ErrorModel } = require('../model/resModel')

function transformToDate(date) {
    const day = 24 * 60 * 60
    const year = (365.2425) * day
    let t = Date.parse(date)
    let timestamp = t / 1000

    const daySin = Math.sin(timestamp * (2 * Math.PI / day))
    const dayCos = Math.cos(timestamp * (2 * Math.PI / day))
    const yearSin = Math.sin(timestamp * (2 * Math.PI / year))
    const yearCos = Math.cos(timestamp * (2 * Math.PI / year))

    return { daySin, dayCos, yearSin, yearCos }
}

function dataProcess(data) {
    if (!data || !data.length) { return }
    const result = {
        "labels": [],
        "data": [],
        "length": 0
    }
    data.forEach((obj) => {
        const row = []
        const { date, humidity, windspeed, temp, cloudcover, rain, solar, generation, after30 } = obj
        const { daySin, dayCos, yearSin, yearCos } = transformToDate(date)
        row.push(daySin, dayCos, yearSin, yearCos, Number(humidity), Number(windspeed), Number(temp),
            Number(cloudcover), Number(rain), Number(solar), Number(generation))
        result.data.push(row)
        result.labels.push(Number(after30))
    })
    result.length = result.data.length
    return result
}

module.exports = dataProcess