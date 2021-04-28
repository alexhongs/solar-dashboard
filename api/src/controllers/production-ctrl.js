const moment = require('moment');
const Production = require('../api/models/productions')
const PVOutput = require('../portals/pvoutput');
const ObjectId = require('mongodb').ObjectID;

// Number of production data to hold
const DB_DAILY_PRODUCTIONS = 7
const DB_WEEKLY_PRODUCTIONS = 6
const DB_MONTHLY_PRODUCTIONS = 12
const DB_YEARLY_PRODUCTIONS = 9
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
        return await _getProduction(panel.weekly, DB_WEEKLY_PRODUCTIONS)
    } else if(req.headers.period == 'm') {
        return await _getProduction(panel.monthly, DB_MONTHLY_PRODUCTIONS)
    } else if(req.headers.period == 'y') {
        return await _getProduction(panel.yearly, DB_YEARLY_PRODUCTIONS)
    } else if(req.headers.period == 't') {
        return await _getProduction(panel.total, DB_TOTAL_PRODUCTION)
    }
    return null
}

productionCtrl_fetchLive = async (req, panel) => {
    if(!panel) return null

    while(panel.live.length > 0) {
        panel.live.pop()
    }
    
    // Make API Get request
    let liveProductions = await PVOutput.pvoutput_getLiveProduction(req, panel) // [oldest .... recent]

    panel.live.push(moment().toISOString())
    for(i = 0; i < liveProductions.length; i++) {
        panel.live.push(liveProductions[i])
    }

    await panel.save()

    return productionCtrl_getLive(req, panel)
}

productionCtrl_getLive = async (req, panel) => {
    // Make API Get request
    let liveProductions = panel.live // [oldest .... recent]
    
    let productions = []
    let peak_power = 0
    // TODO: might need to make this a 30 minute interval
    for(i = 1; i < liveProductions.length - 1; i++) {
        let production = liveProductions[i]
        const date = moment(production.date)
        const time = `${date.hour} ${date.minutes}`
        if(production.power > peak_power) peak_power = production.power
        productions.push(production)
    }
    
    // TODO: change this to month's peak power
    const recentPower = productions[productions.length - 1].power
    const efficiency = recentPower / peak_power

    // TODO: This part is subject to change based on MVP definition
    // If we keep LIVE data of all, we can calculate these on our own
    let data = {
        productions: productions,
        peak_power: peak_power,
        efficiency: efficiency,
    }

    return data
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
    while(productionIds.length > db_productions) {
        const i = productionIds.length - 1
        const toDelete = await Production.findById(productionIds[i])
        if(toDelete) {
            await Production.findOneAndDelete({ _id: toDelete.id})
        }
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
            production.efficiency = day.efficiency
            production.carbon = day.carbon
            production.money = day.money
            await production.save()
        }
    }

    // In an unlikely chance that an API requested production changes to less than 7, when it had at least 7 before
    for (var i = dailyProductions.length; i < productionIds.length; i++) {
        const oldProduction = await Production.findById(productionIds[i])
        oldProduction.magnitude = 0
        oldProduction.date = null
        oldProduction.efficiency = 0
        oldProduction.carbon = 0
        oldProduction.money = 0
        await oldProduction.save()
    }

    await panel.save()

    return await _getProduction(productionIds, db_productions)
}

module.exports = {
    productionCtrl_fetchProduction,
    productionCtrl_getProductionHelper,
    productionCtrl_fetchLive,
    productionCtrl_getLive,
}

// TODO: Figure out a way to export with custom schema
