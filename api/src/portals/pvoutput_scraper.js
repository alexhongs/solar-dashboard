const jsdom = require("jsdom")
const { JSDOM } = jsdom

const axios = require("axios")
const jquery = require("jquery")

const util = require("../util/util")

pvoutput_region_ids = async (region) => {
    try {
        let data = []
        page_number = 0
        while (page_number < 3) {        
            const URL = `https://pvoutput.org/ladder.jsp?p=${page_number}&region=${region}&country=244&seen=1`
            const response = await axios.get(URL)
            const dom = await new JSDOM(response.data)

            const currentPageNumberElement = dom.window.document.querySelector("span[class='active_tnt_link']")
            const currentPageNumber = currentPageNumberElement ? currentPageNumberElement.textContent : null

            if(currentPageNumber == null || currentPageNumber != `${page_number+1}`) {
                break
            }

            const a = dom.window.document.querySelectorAll('a[href*="list.jsp"]')
            a.forEach(element => {
                const id_sid_ = element.getAttribute("href").split("?")
                if (id_sid_[1]) {
                    const id_sid = id_sid_[1].split("&")
                    const id = id_sid[0].split("=")[1]
                    const sid = id_sid[1].split("=")[1]
                    data.push({id: id, sid: sid})
                }
                // console.log(`Hi ${id_sid_[1]}`)
            });
            page_number += 1
        }

        return data
    } catch (e) {
        console.log(`Error: Scraping by Region Id ${e}`)
    }
                // const b = dom.window.document.querySelectorAll('tr')
            // b.forEach(element => {
            //     const s = element.firstChild.textContent
            //     if(s && !isNaN(parseInt(s))) {
            //         const activity = element.children[10].textContent

            //         console.log(element.children[2].innerHTML)

            //         // const id_sid_ = element.children[2].getAttribute("href").split("?")
            //         // console.log(`${element.textContent} ${id_sid_[1]} ${activity}`)
            //         // if (id_sid_[1]) {
            //         //     const id_sid = id_sid_[1].split("&")
            //         //     const id = id_sid[0].split("=")[1]
            //         //     const sid = id_sid[1].split("=")[1]
            //         //     data.push({id: id, sid: sid})
            //         // }
            //     }
            // })

}

pvoutput_getAllStatistic = async (region) => {
    const panels = await pvoutput_region_ids(region)
    const num_panels = 5

    let data = {
        dayProduction: 0,
        dayEfficiency: 0,
        dayCarbonSaved: 0,
        dayMoneySaved: 0,

        lifetimeProduction: 0,
        lifetimeEfficiency: 0,
        lifetimeCarbonSaved: 0,
        lifetimeMoneySaved: 0,

        averageLiveProduction: 0,
        averageDailyProduction: 0,
        averageWeeklyProduction: 0,
        averageMonthlyProduction: 0,
        averageYearlyProduction: 0,
    }

    for (i = 0; i < num_panels; i++) {
        console.log(`${panels[i].id} ${panels[i].sid}`)
        const statistic = await pvoutput_getStatistic(region, panels[i])
        if(statistic) {
            data.dayProduction += statistic.dayProduction
            data.dayEfficiency += statistic.dayEfficiency
            data.dayCarbonSaved += statistic.dayCarbonSaved
            data.dayMoneySaved += statistic.dayMoneySaved
    
            data.lifetimeProduction += statistic.lifetimeProduction
            data.lifetimeEfficiency += statistic.lifetimeEfficiency
            data.lifetimeCarbonSaved += statistic.lifetimeCarbonSaved
            data.lifetimeMoneySaved += statistic.lifetimeMoneySaved
    
            data.averageLiveProduction += statistic.averageLiveProduction
            data.averageDailyProduction += statistic.averageDailyProduction
            data.averageWeeklyProduction += statistic.averageWeeklyProduction
            data.averageMonthlyProduction += statistic.averageMonthlyProduction
            data.averageYearlyProduction += statistic.averageYearlyProduction
        } else {
            console.log(`bad!`)
        }
    }

    data.dayProduction /= num_panels
    data.dayEfficiency /= num_panels
    data.dayCarbonSaved /= num_panels
    data.dayMoneySaved /= num_panels

    data.lifetimeProduction /= num_panels
    data.lifetimeEfficiency /= num_panels
    data.lifetimeCarbonSaved /= num_panels
    data.lifetimeMoneySaved /= num_panels

    data.averageLiveProduction /= num_panels
    data.averageDailyProduction /= num_panels
    data.averageWeeklyProduction /= num_panels
    data.averageMonthlyProduction /= num_panels
    data.averageYearlyProduction /= num_panels

    console.log(` RESULT:
    numberOfPanels: ${num_panels}
    dayProduction: ${data.dayProduction}
    dayEfficiency: ${data.dayEfficiency}
    dayCarbonSaved: ${data.dayCarbonSaved}
    dayMoneySaved: ${data.dayMoneySaved}
    lifetimeProduction: ${data.lifetimeProduction}
    lifetimeEfficiency: ${data.lifetimeEfficiency}
    lifetimeCarbonSaved: ${data.lifetimeCarbonSaved}
    lifetimeMoneySaved: ${data.lifetimeMoneySaved}`)

    return data
}

pvoutput_getStatistic = async (region, panel) => {
    console.log(`id ${panel.id} sid ${panel.sid}`)

    let statistic = {
        dayProduction: 0,
        dayEfficiency: 0,
        dayCarbonSaved: 0,
        dayMoneySaved: 0,

        lifetimeProduction: 0,
        lifetimeEfficiency: 0,
        lifetimeCarbonSaved: 0,
        lifetimeMoneySaved: 0,
    
        averageLiveProduction: 0,
        averageDailyProduction: 0,
        averageWeeklyProduction: 0,
        averageMonthlyProduction: 0,
        averageYearlyProduction: 0,
    }

    try {
        let dayList = await _getList(panel.id, panel.sid)
        let stat = await _getStatistic(panel.id, panel.sid)
        let aggregate = await _getAggregate(panel.id, panel.sid)
        let analyse = await _getAnalyse(panel.id, panel.sid)
        if(dayList && !dayList[0]) return null
        
        statistic.dayProduction = dayList[0].production
        statistic.dayEfficiency = _dayEfficiency(dayList[0].production, stat.threeMonthAverage)
        statistic.dayCarbonSaved = util.getCarbon(dayList[0].production)
        statistic.dayMoneySaved = util.getMoney(2020, dayList[0].production)

        statistic.lifetimeProduction = stat.lifetimeProduction
        statistic.lifetimeEfficiency = stat.lifetimeEfficiency
        statistic.lifetimeCarbonSaved = stat.lifetimeCarbonSaved
        statistic.lifetimeMoneySaved = stat.lifetimeMoneySaved

        statistic.averageLiveProduction = 0
        statistic.averageDailyProduction = _averageDailyProduction(dayList)
        statistic.averageWeeklyProduction = _averageWeeklyProduction(dayList)
        statistic.averageMonthlyProduction = aggregate.monthlyProduction
        statistic.averageYearlyProduction = aggregate.yearlyProduction

        return statistic
    } catch (e) {
        console.log(`Error: Get Statistic ${e}`)
        return null
    }
}

_getList = async (id, sid) => {
    let data = []

    const URL = `https://pvoutput.org/list.jsp?id=${id}&sid=${sid}`
    const response = await axios.get(URL)
    const dom = await new JSDOM(response.data)
    const entries = dom.window.document.querySelectorAll('tr[class*="2"]')

    entries.forEach(element => {
        const dateElement = element.querySelector('a[href*="intraday.jsp"]')
        const date = dateElement.textContent

        const productionElement = element.querySelector('td[title*="Exported:"]')
        const productionText = productionElement.textContent
        const productionMagnitudeText = productionText.split("kWh")[0]
        const production = parseFloat(productionMagnitudeText) * 1000

        const entry = {date: date, production: production}
        data.push(entry)
    });

    // console.log(`Get List ${data.length} entries`)

    return data
}


_getStatistic = async (id, sid) => {
    let data = {
        lifetimeProduction: 0,
        lifetimeEfficiency: 0,
        lifetimeCarbonSaved: 0,
        lifetimeMoneySaved: 0,
        threeMonthreeMonthAveragethPeak: 0,
    }

    let totalProduction = 0
    let averageProduction = 0
    let peakProduction = 0
    let threeMonthAverage = 0

    const URL = `https://pvoutput.org/statistic.jsp?id=${id}&sid=${sid}`
    const response = await axios.get(URL)
    const dom = await new JSDOM(response.data)
    const entries = dom.window.document.querySelectorAll('tr')

    entries.forEach(element => {
        if (element.firstChild.textContent == "Total Generation") {
            totalProduction = _stringToMagnitude(element.children[1].textContent)
        } else if (element.firstChild.textContent == "Average Generation") {
            averageProduction = _stringToMagnitude(element.children[1].textContent)
            threeMonthAverage = _stringToMagnitude(element.children[3].textContent)
        } else if (element.firstChild.textContent == "Maximum Generation") {
            peakProduction = _stringToMagnitude(element.children[1].textContent)
        }
    });

    data.lifetimeProduction = totalProduction
    data.lifetimeEfficiency = averageProduction / peakProduction
    data.lifetimeMoneySaved = util.getMoney(2020, totalProduction)
    data.lifetimeCarbonSaved = util.getCarbon(totalProduction)
    data.threeMonthAverage = threeMonthAverage

    // console.log(`Get Statistic 
    // Lifetime Production: ${data.lifetimeProduction}
    // Lifetime Efficiency: ${data.lifetimeEfficiency}
    // Lifetime Money Saved: ${data.lifetimeMoneySaved}
    // Lifetime Carbon Saved: ${data.lifetimeCarbonSaved}
    // 3 Month Peak: ${data.threeMonthPeak}`)

    return data
}

_getAggregate = async (id, sid) => {
    let data = {
        monthlyProduction: 0,
        yearlyProduction: 0,
    }

    let URL = `https://pvoutput.org/aggregate.jsp?id=${id}&sid=${sid}&t=m`
    let response = await axios.get(URL)
    let dom = await new JSDOM(response.data)
    let entries = dom.window.document.querySelectorAll('tr')

    let monthlyCount = 0
    let first = true
    entries.forEach(element => {
        if(element.children && element.children[1]) {
            const value = _stringToMagnitude(element.children[1].textContent)
            if (value != -1 && monthlyCount < 5) {
                if (first) {
                    first = false
                } else {
                    data.monthlyProduction += value
                    monthlyCount += 1
                }
            }
        }
    })
    
    URL = `https://pvoutput.org/aggregate.jsp?id=${id}&sid=${sid}&t=y`
    response = await axios.get(URL)
    dom = await new JSDOM(response.data)
    entries = dom.window.document.querySelectorAll('tr')

    let yearlyCount = 0
    first = true
    entries.forEach(element => {
        if(element.children && element.children[1]) {
            const value = _stringToMagnitude(element.children[1].firstChild.textContent)
            if (value != -1 && yearlyCount < 5) {
                if (first) {
                    first = false
                } else {
                    data.yearlyProduction += value
                    yearlyCount += 1
                }
            }
        }
    })

    data.monthlyProduction /= monthlyCount
    data.yearlyProduction /= yearlyCount

    // console.log(`Final Get Monthly Production ${data.monthlyProduction}
    // Yearly Production ${data.yearlyProduction}`)

    return data
}

pvoutput_getPower = async (id, sid) => {
    let data = {
        lifetimePower: 0,
    }
    const URL = `https://pvoutput.org/statistic.jsp?id=${id}&sid=${sid}`
    const response = await axios.get(URL)
    const dom = await new JSDOM(response.data)
    const entries = dom.window.document.querySelectorAll('tr')

    entries.forEach(element => {
        if (element.firstChild.textContent == "Maximum Power") {
            data.lifetimePower = _stringToMagnitude(element.children[1].textContent)
        }
    });
    console.log(`data ${data.lifetimePower}`)
    return data
}


_getAnalyse = async (id, sid) => {
    return 42
}


//////////////////////
// Helper Functions
//////////////////////

_dayEfficiency = (production, peak) => {
    return peak == 0 ? -1 : production / peak
}

_averageDailyProduction = async (dailyList) => {
    let production = 0
    let first = true
    dailyList.forEach(day => {
        if(first) {
            first = false
        } else{
            production += day.production
        }
    })
    return dailyList.length == 1 ? production : production / (dailyList.length - 1)
}

_averageWeeklyProduction = (dailyList) => {
    const length = dailyList.length

    let sum = 0

    let first = true
    let last = Math.floor(length / 7) * 7

    let i = 0
    let count = 0
    dailyList.forEach(day => {
        if(first) {
            first = false
        } else {
            if (i < last) {
                sum += day.production
                count += 1
            }
        }
        i += 1
    })

    return count == 0 ? 0 : sum / count
}

_stringToMagnitude = (productionText) => {
    if(productionText.search('kWh') != -1) {
        const text = productionText.split('kWh')[0]
        return parseFloat(text) * 1000
    } else if(productionText.search('MWh') != -1) {
        const text = productionText.split('MWh')[0]
        return parseFloat(text) * 1000000
    } else if(productionText.search('kW') != -1) {
        const text = productionText.split('kW')[0]
        return parseFloat(text) * 1000
    } else if(productionText.search('MW') != -1) {
        const text = productionText.split('MW')[0]
        return parseFloat(text) * 1000000
    }
    return -1
}


// SEPARATE CONSUMER DB 

// Cache update cycle: Hourly
// <Today>
// GET: Consumers' Average Today's Production
    // Consumer's Today's Production (list.jsp)
    // Average
// MAKE: Consumers' Average Today's Efficiency
    // GET: Consumer's Today's Production (list.jsp)
    // GET: Consumer's 3 Month Peak (statistic.jsp)
    // Divide
    // Average
// MAKE: Consumer's Average Today's Carbon Saved
    // Consumer's Today's Production (list.jsp)
    // Calculate
// MAKE: Consumer's Average Today's Money Saved
    // Consumer's Today's Production (list.jsp)
    // Calculate


// Cache update cycle: Daily
// <LifeTime>
// GET: Consumers' Average Total Production
    // Consumer's Total Production (statistic.jsp)
    // Average
// MAKE: Consumers' Average Lifetime Efficiency
    // GET: Consumer's Lifetime Average Generation (statistic.jsp)
    // GET: Consumer's Lifetime Peak (statistic.jsp)
    // Divide
    // Average
// MAKE: Consumer's Average Carbon Saved
    // Consumers' Average Total Production
    // Calculate
// MAKE: Consumer's Average Money Saved
    // Consumers' Average Total Production
    // Calculate


// GET: Consumer's Average Live Production (analyse.jsp)
// GET: Consumer's Average Daily Production
    // Consumer's Daily Production
        // Consumer's Day Production (list.jsp)
        // Average
    // Average in Days
// GET: Consumer's Average Weekly Production (list.jsp)
    // Consumer's Weekly Production
        // Consumer's 7 Day Production (list.jsp)
        // Average
    // Average
// GET: Consumer's Average Monthly Production
    // Consumer's Monthly Production  (aggregate.jsp?t=m)
    // Average
// GET: Consumer's Average Yearly Production
    // Consumer's Yearly Production  (aggregate.jsp?t=y)
    // Average   

module.exports = {
    // pvoutput_region_ids,
    // pvoutput_getAllStatistic,
    // pvoutput_getStatistic,
    pvoutput_getPower,
}