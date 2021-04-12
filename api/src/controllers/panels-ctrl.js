const Panel = require('../api/models/panels')

createPanel = (req, res) => {
    const body = req.body
    
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a panel',
        })
    }
    const tempBody = {
        production: ['Daily', 'Weekly', 'Monthly', 'Yearly'],
        zipcode: 15213,
        time: ["Great"],
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

getPanelsById = async (req, res) => {
    // TODO: Need a user check here

    await Panel.findOne({ _id: req.params.id }, (err, panel) => {
        if (err) {
            return res.status(400).json({success: false, error: err})
        }
        if (!panel) {
            return res
                .status(404)
                .json({success: false, error: err});
        }
        return res
            .status(200)
            .json({success: true, data: panel});
    }).catch(err => console.log(err))
}

getPanel = async (req, res) => {
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

module.exports = {
    createPanel,
    getPanelsById,
    getPanel,
}