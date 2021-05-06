const moment = require('moment')
const Panel = require('../api/models/panels')
const Production = require('../api/models/productions')
const ProductionCtrl = require('../controllers/production-ctrl')
const Validate = require('../util/validate')
const User = require('../api/models/users')
const ObjectId = require('mongodb').ObjectID
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const UPDATE_INTERVAL_LIVE = 5 // minutes
const UPDATE_INTERVAL_DAILY = 20 // minutes
const UPDATE_INTERVAL_WEEKLY = 1 // days
const UPDATE_INTERVAL_MONTHLY = 1 // days
const UPDATE_INTERVAL_YEARLY = 1 // days

createPanel = async (data) => {
    try {
        if(!data) return null
        console.log(`panel panel ${data}`)
        const checkValid = await Validate.validatePanel(data)
        if(!checkValid.isValid) return checkValid
        console.log(`panel panel valid ${data}`)
        const params = {
            cost: parseInt(data.cost ?? 0),
            sid: parseInt(data.sid),
            apikey: data.apikey,
        };
        console.log(`panel panel valid panel ${data}`)
        const panel = new Panel(params)
        console.log(`panel panel valid panel after ${panel}`)
        return {panel: panel}
    } catch (e) {
        return {error: `Error: ${e}`}
    }
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
            .json({success: true, data: panels, lastUpdated: panel.updatedAt});
    }).catch(err => console.log(err))
}

panelsCtrl_getProduction = async (req, res) => {
    try {
        console.log(`\nGET Production (${req.headers.period})`)
        // TODO: Need parameter and user_id checking here
        // TODO: Ideally we want this to be not taking in panel id, but the 

        const tempId = '6075363f5f4ba77cd92828d0'
        const panel = await Panel.findById(tempId);
        if(!panel) return res.status(200).json({success: false, error: "Unable to find Panel"})

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
        return res.status(200).json({success: true, data: data, lastUpdated: panel.updatedAt})
    } catch (err) {
        console.log(`Error: Get Production ${req.body.period} ${err}`)
        return res.status(400).json({success: false, error: err})
    }
}

panelsCtrl_getLive = async (req, res) => {
    try {
        console.log(`\nGET Live Production`)
        const tempId = '6075363f5f4ba77cd92828d0'
        const panel = await Panel.findById(tempId);
        if(!panel) return res.status(400).json({success: false, error: "Unable to find Panel"})

        if (panel.live != null && panel.live.length > 0){

            // Check Recent
            const latestDateTime = moment(panel.live[0])
            if (latestDateTime) {
                const now = moment(moment.now())
                var ms = now.diff(latestDateTime, "minutes");

                // Round down to nearest 5 minute
                let minute = parseInt(latestDateTime.minutes())
                const remainder = minute % 10
                if (minute % 10 < 5) {
                    minute -= remainder
                } else {
                    minute -= (remainder % 5)
                }

                if (ms < UPDATE_INTERVAL_LIVE && (now.minutes() - minute) < UPDATE_INTERVAL_LIVE) {
                    // If recent, return the DB data
                    const oldProduction = await ProductionCtrl.productionCtrl_getLive(req, panel)
                    console.log(`GET Live: HIT (day ${moment(latestDateTime).toLocaleString()},now ${now.toLocaleString()}) ${ms} production ${oldProduction.productions.length}`)
                    return res.status(200).json({success: true, data: oldProduction, lastUpdated: panel.updatedAt})
                }
                else {
                    console.log(`GET Live: MISS (day ${moment(latestDateTime).toLocaleString()},now ${now.toLocaleString()}) ${ms}`)
                }
            }
        }

        let data = await ProductionCtrl.productionCtrl_fetchLive(req, panel)

        // Fetch new live production data of the day
        console.log(`\nGET Live: MISS FETCH production ${data.productions.length}`)
        return res.status(200).json({success: true, data: data, lastUpdated: panel.updatedAt})
    } catch (err) {
        console.log(`Error: Get Live ${err}`)
        return res.status(400).json({success: false, error: err})
    }
}

panelsCtrl_testCreatePanel = async (req,res) => {
    const header = {
        name: "kristina",
        username: "kristina123",
        password: "password",
        sid: "82698",
        apikey: "7df3ab93a0938d4acd4a261917b392df6915d076",
    }

    const cost = "10000"
    const zipcode = "15213"
    const object_id = "6075363f5f4ba77cd92828d0"

    try {
        const user = await User.findOne({username:header.username})
        if(user) {
            return res.status(201).json({error: `Username '${header.username}' already exists`})
        }
        const {error, panel} = await createPanel(header)
        if(error || !panel) {
            return res.status(201).json({error: `Invalid panel ${error}  ${panel}`})
        }
        console.log(`panel!!!!`)

        const newUser = new User({
            name: header.name,
            username: header.username,
            password: header.password,
            panelId: panel._id,
            sid: panel.sid,
        });
        
        // Hash password before storing in database
        const rounds  = 10
        const salt = await bcrypt.genSalt(rounds)
        const hash = await bcrypt.hash(newUser.password, salt)
    
        newUser.password = hash
        await newUser.save()
    
        panel.userId = newUser._id
        panel._id = ObjectId(object_id)
        await panel.save()

        return res.status(201).json({success: true, data: {
            'username': newUser.username,
            'user_id': newUser._id,
            'panel_id': panel._id,
            'api_key': panel.apikey,
        }})
    } catch (e) {return res.status(201).json(`Error: ${e}`)}
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

        // TODO: Need to do modulo stuff, refer to Get Live

        // Check Recent
        const production = await Production.findById(productionIds[index - 1])
        if (production) {
            const recentDate = (period == 't' || period == 'w') ? production.updatedAt : production.date
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
    console.log(`\nGET Production: MISS FETCH production ${newProduction.length}`)
    return newProduction
}

module.exports = {
    createPanel,
    panelsCtrl_getPanel,
    panelsCtrl_getProduction,
    panelsCtrl_getLive,
    panelsCtrl_testCreatePanel,
}