const { min } = require('moment');
const moment = require('moment');
const Production = require('../api/models/productions')
const PVOutput = require('../portals/pvoutput');

const DB_DAILY_PRODUCTIONS = 7
const DB_WEEKLY_PRODUCTIONS = 4
const DB_MONTHLY_PRODUCTIONS = 12
const DB_YEARLY_PRODUCTIONS = 4
const DB_TOTAL_PRODUCTION = 1

productionCtrl_fetchProduction = async (req, panel) => {
    if(req.headers.period == 'd') {
        return await _fetchProduction(req, panel, panel.daily, DB_DAILY_PRODUCTIONS)
    } else if(req.headers.period == 'w') {
        return await _fetchProduction(req, panel, panel.weekly, DB_WEEKLY_PRODUCTIONS)
    } else if(req.headers.period == 'm') {
        return await _fetchProduction(req, panel, panel.monthly, DB_MONTHLY_PRODUCTIONS)
    } else if(req.headers.period == 'y') {
        return await _fetchProduction(req, panel, panel.yearly, DB_YEARLY_PRODUCTIONS)
    } else if(req.headers.period == 't') {
        return await _fetchProduction(req, panel, panel.total, DB_TOTAL_PRODUCTION)
    }
    return null;
}

productionCtrl_getProductionHelper = async (req, panel) => {
    if(req.headers.period == 'd') {
        return await _getProduction(panel.daily, DB_DAILY_PRODUCTIONS)
    } else if(req.headers.period == 'w') {
        // return await _getProduction(panel.weekly, DB_WEEKLY_PRODUCTIONS)
    } else if(req.headers.period == 'm') {
        return await _getProduction(panel.monthly, DB_MONTHLY_PRODUCTIONS)
    } else if(req.headers.period == 'y') {
        return await _getProduction(panel.yearly, DB_YEARLY_PRODUCTIONS)
    } else if(req.headers.period == 't') {
        return await _getProduction(panel.total, DB_TOTAL_PRODUCTION)
    }
    return null
}


//////////////////////////
// HELPER FUNCTIONS
//////////////////////////

_getProduction = async (productionIds, db_productions) => {
    if(!productionIds) return null

    const data = []
    for(i = 0; i < Math.min(productionIds.length, db_productions); i++) {
        if(productionIds[i]) {
            const production = await Production.findById(productionIds[i])
            data.push(production)
        }
    }
    return data
}

_fetchProduction = async (req, panel, productionIds, db_productions) => {
    if(!panel) return null
    // In an unlikely chance that the panel daily is not filled to DB_DAILY_PRODUCTIONS, fill it up
    // Ensures(panel.daily.length === DB_DAILY_PRODUCTIONS)
    for (var i = productionIds.length; i > db_productions; i --) {
        const toDelete = await Production.findById(productionIds[i])
        if(toDelete) toDelete.remove()
        productionIds.pop()
    }
    for (var i = productionIds.length; i < db_productions; i ++) productionIds.push(null)

    // Make API Get request
    let dailyProductions = await PVOutput.pvoutput_getProduction(req, db_productions) // [oldest .... recent]

    for (var i = 0; i < dailyProductions.length; i++) {
        // Update the latest 7 production
        const day = dailyProductions[i]

        if(i < productionIds.length) {
            let production = productionIds[i] ? await Production.findById(productionIds[i]) : null
            if (!production) {
                production = new Production()
                productionIds.set(i, production._id)
            }
            production.date = moment(day.date)
            production.magnitude = day.magnitude
            await production.save()
        }
    }

    // In an unlikely chance that an API requested production changes to less than 7, when it had at least 7 before
    for (var i = dailyProductions.length; i < productionIds.length; i++) {
        const oldProduction = await Production.findById(productionIds[i])
        oldProduction.magnitude = 0
        oldProduction.date = null
        await oldProduction.save()
    }

    await panel.save()

    return await _getProduction(productionIds, db_productions)
}

_fetchWeeklyProduction = async (req, panel) => {
    console.log(`FETCH: Weekly Production`)
    return null;
}

_fetchTotalProduction = async (req, panel) => {
    console.log(`FETCH: Total Production`)
    const productions = PanelsCtrl.panelsCtrl_getProduction(req, null)
    const totalProduction = 0

    productions.forEach(production => {
        totalProduction += production.magnitude
    });

    const total = {
        magnitude: production[0].magnitude,
        date: productions[0].date,
    }
    return [total];
}

module.exports = {
    productionCtrl_fetchProduction,
    productionCtrl_getProductionHelper,
}


// TODO: Figure out a way to export with custom schema
