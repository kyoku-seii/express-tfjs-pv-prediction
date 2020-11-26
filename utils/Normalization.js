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

const normalize = (data) => {
    if (!data || !data.length) { return }
    const result = {
        "features": ["daySin", "dayCos", "yearSin", "yearCos", "humidity", "windspeed",
            "temp", "cloudcover", "rain", "solar", "generate"],
        "labels": [],
        "data": [],
        "max": new Array(11).fill(Number.NEGATIVE_INFINITY),
        "min": new Array(11).fill(Number.POSITIVE_INFINITY)
    }
    data.forEach((obj) => {
        const row = []
        const { date, humidity, windspeed, temp, cloudcover, rain, solar, generate, after30 } = obj
        const { daySin, dayCos, yearSin, yearCos } = transformToDate(date)
        row.push(daySin, dayCos, yearSin, yearCos, Number(humidity), Number(windspeed), Number(temp),
            Number(cloudcover), Number(rain), Number(solar), Number(generate))
        row.forEach((e, index) => {
            if (e > result.max[index]) { result.max[index] = e }
            if (e < result.min[index]) { result.min[index] = e }
        })
        result.data.push(row)
        result.labels.push(Number(after30))
    })
    return result
}

module.exports = normalize