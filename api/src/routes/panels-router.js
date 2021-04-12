const express = require('express')

const PanelsCtrl = require('../controllers/panels-ctrl')

const router = express.Router()

router.get('/', PanelsCtrl.getPanel)
router.get('/:id', PanelsCtrl.getPanelsById)
router.post('/', PanelsCtrl.createPanel)

module.exports = router