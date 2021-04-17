const { min } = require('moment');
const moment = require('moment');
const Production = require('../api/models/productions')
const PVOutput = require('../portals/pvoutput');

const DB_DAILY_PRODUCTIONS = 7
const DB_WEEKLY_PRODUCTIONS = 4
const DB_MONTHLY_PRODUCTIONS = 12
const DB_YEARLY_PRODUCTIONS = 4

fetchProduction = async (req, panel) => {
    if(req.headers.period == 'd') {
        return await fetchDailyProduction(req, panel)
    } else if(req.headers.period == 'w') {
        return await fetchWeeklyProduction(req, panel)
    } else if(req.headers.period == 'm') {
        console.log('\n\n\nFetch Monthly!!');
        return await fetchMonthlyProduction(req, panel)
    } else if(req.headers.period == 'y') {
        return await fetchYearlyProduction(req, panel)
    } else if(req.headers.period == 't') {
        return await fetchTotalProduction(req, panel)
    }
    return null;
}

getDailyProduction = async (req, panel) => {
    if(!panel || !panel.daily) return null

    const data = []
    for(i = 0; i < Math.min(panel.daily.length, DB_DAILY_PRODUCTIONS); i++) {
        if(panel.daily[i]) {
            const production = await Production.findById(panel.daily[i])
            data.push(production)
        }
    }
    return data
}

getMonthlyProduction = async (req, panel) => {
    if(!panel || !panel.monthly) return null

    const data = []
    for(i = 0; i < Math.min(panel.monthly.length, DB_MONTHLY_PRODUCTIONS); i++) {
        if(panel.monthly[i]) {
            const production = await Production.findById(panel.monthly[i])
            data.push(production)
        }
    }
    return data
}

//////////////////////////
// HELPER FUNCTIONS
//////////////////////////

fetchDailyProduction = async (req, panel) => {
    if(!panel) return null
    // In an unlikely chance that the panel daily is not filled to DB_DAILY_PRODUCTIONS, fill it up
    // Ensures(panel.daily.length === DB_DAILY_PRODUCTIONS)
    for (var i = panel.daily.length; i < DB_DAILY_PRODUCTIONS; i ++) {
        // console.log(`FETCH: Nulling Empty Productions ${i}/${DB_DAILY_PRODUCTIONS}`)
        panel.daily.push(null)
    }

    // Make API Get request
    const dailyProductions = await PVOutput.getProduction(req, DB_DAILY_PRODUCTIONS) // [oldest .... recent]

    for (var i = 0; i < dailyProductions.length; i++) {
        // Update the latest 7 production
        const day = dailyProductions[i]
        if(i < panel.daily.length) {
            let production = panel.daily[i] ? await Production.findById(panel.daily[i]) : null
            if (!production) {
                production = new Production()
                panel.daily.set(i, production._id)
            }
            production.date = moment(day[0])
            production.magnitude = day[1]
            await production.save()
        }
    }
    // console.log(`FETCH: Daily Production : ${dailyProductions}`)
    // In an unlikely chance that an API requested production changes to less than 7, when it had at least 7 before
    for (var i = dailyProductions.length; i < panel.daily.length; i++) {
        const oldProduction = await Production.findById(panel.daily[i])
        oldProduction.magnitude = 0
        oldProduction.date = null
        await oldProduction.save()
    }

    await panel.save()

    return await getDailyProduction(req, panel)
}

fetchWeeklyProduction = async (req, panel) => {
    console.log(`FETCH: Weekly Production`)
    return null;
}

fetchMonthlyProduction = async (req, panel) => {
    if(!panel) return null
    console.log(`FETCH: Monthly Production`)

    // In an unlikely chance that the panel daily is not filled to DB_DAILY_PRODUCTIONS, fill it up
    // Ensures(panel.daily.length === DB_DAILY_PRODUCTIONS)
    for (var i = panel.monthly.length; i < DB_MONTHLY_PRODUCTIONS; i ++) {
        // console.log(`FETCH: Nulling Empty Productions ${i}/${DB_DAILY_PRODUCTIONS}`)
        panel.monthly.push(null)
    }

    // Make API Get request
    const monthlyProductions = await PVOutput.getProduction(req, DB_MONTHLY_PRODUCTIONS) // [oldest .... recent]
    console.log(`Monthly Productions !! ${monthlyProductions}`);

    for (var i = 0; i < monthlyProductions.length; i++) {
        // Update the latest 12 production
        const day = monthlyProductions[i]
        if(i < panel.monthly.length) {
            let production = panel.monthly[i] ? await Production.findById(panel.monthly[i]) : null
            if (!production) {
                production = new Production()
                panel.monthly.set(i, production._id)
            }
            production.date = moment(day[0])
            production.magnitude = day[2]
            await production.save()
        }
    }

    // In an unlikely chance that an API requested production changes to less than 7, when it had at least 7 before
    for (var i = monthlyProductions.length; i < panel.monthly.length; i++) {
        const oldProduction = await Production.findById(panel.monthly[i])
        oldProduction.magnitude = 0
        oldProduction.date = null
        await oldProduction.save()
    }

    await panel.save()
    console.log(`\nMonthly Productions last ${monthlyProductions}\n`);
    return await getMonthlyProduction(req, panel)
}

fetchYearlyProduction = async (req, panel) => {
    console.log(`FETCH: Yearly Production`)
    return null;
}

fetchTotalProduction = async (req, panel) => {
    console.log(`FETCH: Total Production`)
    return null;
}

module.exports = {
    fetchProduction,
    getDailyProduction,
    getMonthlyProduction,
}


// TODO: Figure out a way to export with custom schema
