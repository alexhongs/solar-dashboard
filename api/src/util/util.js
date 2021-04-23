const CARBON_FACTOR = 400

const ELECTRICITY_RATES = {
    1999: 0.047,
    2000: 0.056,
    2001: 0.058,
    2002: 0.058,
    2003: 0.058,
    2004: 0.059,
    2005: 0.063,
    2006: 0.066,
    2007: 0.069,
    2008: 0.070,
    2009: 0.072,
    2010: 0.077,
    2011: 0.077,
    2012: 0.072,
    2013: 0.070,
    2014: 0.074,
    2015: 0.072,
    2016: 0.069,
    2017: 0.068,
    2018: 0.068,
    2019: 0.068,
    2020: 0.068
}

getCarbon = (production) => {
    return production / 1000 * CARBON_FACTOR // production (Wh)  and  constant (g / kWh)
}

getMoney = (year, production) => {
    const rate = ELECTRICITY_RATES[year] ?? 0.07
    return production / 1000 * rate // production (Wh)  and  rate ($ / kWh)
}

getEfficiency = () => {
    return 42 // TODO
}

module.exports = {
    getCarbon,
    getMoney,
    getEfficiency,
}