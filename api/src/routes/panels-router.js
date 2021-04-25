const express = require('express')

const PanelsCtrl = require('../controllers/panels-ctrl')

const router = express.Router()
router.get('/production', PanelsCtrl.panelsCtrl_getProduction)
router.get('/', PanelsCtrl.panelsCtrl_getPanel)

module.exports = router