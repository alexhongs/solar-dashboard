const moment = require('moment')
const Panel = require('../api/models/panels')
const Production = require('../api/models/productions')
const ProductionCtrl = require('../controllers/production-ctrl')

const UPDATE_INTERVAL = 20

createPanel = (req, res) => {
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

getPanel = async (req, res) => {
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

getProduction = async (req, res) => {
    try {
        let data = null;
        if(req.headers.period == 'd') {
            data = await getDailyProduction(req, res)
        } else if(req.headers.period == 'w') {
            data = await getWeeklyProduction(req, res)
        } else if(req.headers.period == 'm') {
            console.log('\n\n\nMonthly!!');
            data = await getMonthlyProduction(req, res)
        } else if(req.headers.period == 'y') {
            data = await getYearlyProduction(req, res)
        } else if(req.headers.period == 't') {
            data = await getTotalProduction(req, res)
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

getDailyProduction = async (req, res) => {
    console.log('\nGet Daily Production Called!');
    // TODO: Need parameter and user_id checking here
    // TODO: Ideally we want this to be not taking in panel id, but the 

    const tempId = '6075363f5f4ba77cd92828d0'

    const panel = await Panel.findById(tempId);

    // If production data exists in DB
    if(panel.daily.length != 0 && panel.daily[0]) {
        let index = panel.daily.findIndex(s => s == null)
        if (index == -1) index = panel.daily.length

        // Check Recent
        const production = await Production.findById(panel.daily[index - 1])
        if (production) {
            const recentDate = production.date
            const now = moment(moment.now())
            var ms = now.diff(recentDate, 'minutes');
            if (ms < UPDATE_INTERVAL) {
                // If recent, return the DB data
                const oldProduction = await ProductionCtrl.getProduction(req, panel)
                console.log(`\nGET Daily Production: HIT diff=${ms}min \nRecent ${recentDate}\nNow ${now}\nsending DB production ${oldProduction.length}`)
                return oldProduction
            }
        }
    }

    // If no production data in DB or not recent, fetch
    const newProduction = await ProductionCtrl.fetchProduction(req, panel)
    console.log(`\nGET Daily Production: MISS FETCH production ${newProduction.length}`)
    return newProduction
}


getWeeklyProduction = async (req, res) => { 
    console.log('\nGet Weekly Production');
    return null; 
}

getMonthlyProduction = async (req, res) => {
    console.log('\nGet Monthly Production');
    // TODO: Need parameter and user_id checking here
    // TODO: Ideally we want this to be not taking in panel id, but the 

    const tempId = '6075363f5f4ba77cd92828d0'

    const panel = await Panel.findById(tempId);

    // // If production data exists in DB
    // if(panel.monthly.length != 0 && panel.monthly[0]) {
    //     let index = panel.monthly.findIndex(s => s == null)
    //     if (index == -1) index = panel.monthly.length

    //     // Check Recent
    //     const production = await Production.findById(panel.monthly[index - 1])
    //     if (production) {
    //         const recentDate = production.date
    //         const now = moment(moment.now())
    //         var ms = now.diff(recentDate, 'minutes');
    //         if (ms < UPDATE_INTERVAL) {
    //             // If recent, return the DB data
    //             const oldProduction = await ProductionCtrl.getProduction(req, panel)
    //             console.log(`\nGET Monthly Production: HIT diff=${ms}min \nRecent ${recentDate}\nNow ${now}\nsending DB production ${oldProduction}`)
    //             return oldProduction
    //         }
    //     }
    // }

    // If no production data in DB or not recent, fetch
    const newProduction = await ProductionCtrl.fetchProduction(req, panel)
    console.log(`GET Monthly Production: MISS FETCH production ${newProduction}`)
    return newProduction
}

getYearlyProduction = async (req, res) => { 
    console.log('\nGet Yearly Production');
    return null; 
}

getTotalProduction = async (req, res) => {
    console.log('\nGet Total Production');
    return null;
}

module.exports = {
    createPanel,
    getPanel,
    getProduction,
}