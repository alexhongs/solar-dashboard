const moment = require('moment')
const Panel = require('../api/models/panels')
const Production = require('../api/models/productions')
const ProductionCtrl = require('../controllers/production-ctrl')

const UPDATE_INTERVAL_DAILY = 20 // minutes
const UPDATE_INTERVAL_WEEKLY = 1 // days
const UPDATE_INTERVAL_MONTHLY = 1 // days
const UPDATE_INTERVAL_YEARLY = 1 // days

panelsCtrl_createPanel = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a panel',
        })
    }
    const tempBody = {
        daily: [],
        weekly: [],
        monthly: [],
        yearly: [],
        zipcode: 15213,
        weather: ['Sunny', '23.0', 'F'],
        timezone: 'EST',
    };
    const panel = new Panel(tempBody)

    if (!panel) {
        return res.status(400).json({success: false, error: err})
    }

    panel
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: panel._id,
                message: 'Panel Created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Panel not created!',
            })
        })
}

panelsCtrl_getPanel = async (req, res) => {
    console.log('Get Panel Called!');
    // THIS IS ONLY TEMPORARY USE

    await Panel.find({}, (err, panels) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!panels) {
            return res
                .status(404)
                .json({success: false, error: err});
        }
        return res
            .status(200)
            .json({success: true, data: panels});
    }).catch(err => console.log(err))
}

panelsCtrl_getProduction = async (req, res) => {
    try {
        console.log(`\nGET Production (${req.headers.period})`)
        // TODO: Need parameter and user_id checking here
        // TODO: Ideally we want this to be not taking in panel id, but the 

        const tempId = '6075363f5f4ba77cd92828d0'
        const panel = await Panel.findById(tempId);
        if(!panel) return res.status(200).json({success: true, data: data})

        let data = null;

        if(req.headers.period == 'd') {
            data = await _getProductionHelper(req, panel, panel.daily, 'minutes', UPDATE_INTERVAL_DAILY)
        } else if(req.headers.period == 'w') {
            data = await _getProductionHelper(req, panel, panel.weekly, 'days', UPDATE_INTERVAL_WEEKLY)
        } else if(req.headers.period == 'm') {
            data = await _getProductionHelper(req, panel, panel.monthly, 'days', UPDATE_INTERVAL_MONTHLY)
        } else if(req.headers.period == 'y') {
            data = await _getProductionHelper(req, panel, panel.yearly, 'days', UPDATE_INTERVAL_YEARLY)
        } else if(req.headers.period == 't') {
            data = await _getProductionHelper(req, panel, panel.total, 'days', UPDATE_INTERVAL_YEARLY)
        }
        return res.status(200).json({success: true, data: data})
    } catch (err) {
        console.log(`Error: Get Production ${req.body.period} ${err}`)
        return res.status(400).json({success: false, error: err})
    }
}



//////////////////////////
// HELPER FUNCTIONS
//////////////////////////

_getProductionHelper = async (req, panel, productionIds, estimateUnit, updateInterval) => {
    // If production data exists in DB
    const period = req.headers.period
    if(productionIds.length != 0 && productionIds[0]) {
        let index = productionIds.findIndex(s => s == null)
        if (index == -1) index = productionIds.length

        // Check Recent
        const production = await Production.findById(productionIds[index - 1])
        if (production) {
            const recentDate = period == 't' ? production.updatedAt : production.date
            const now = moment(moment.now())
            var ms = now.diff(recentDate, estimateUnit);
            if (ms < updateInterval) {

                // If recent, return the DB data
                const oldProduction = await ProductionCtrl.productionCtrl_getProductionHelper(req, panel)
                console.log(`GET Production: HIT (day ${moment(recentDate).day()}, now ${now.day()}) ${ms} ${estimateUnit}  production ${oldProduction.length}`)
                return oldProduction
            }
        }
    }

    // If no production data in DB or not recent, fetch
    const newProduction = await ProductionCtrl.productionCtrl_fetchProduction(req, panel)
    console.log(`\nGET Daily Production: MISS FETCH production ${newProduction.length}`)
    return newProduction
}

// getWeeklyProduction = async (req, res) => { 
//     console.log('\nGet Weekly Production');
//     return null; 
// }

// getTotalProduction = async (req, res) => {
//     console.log('\nGet Total Production');
//     return null;
// }

module.exports = {
    panelsCtrl_createPanel,
    panelsCtrl_getPanel,
    panelsCtrl_getProduction,
}