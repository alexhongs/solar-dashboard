const express = require('express')

const PanelsCtrl = require('../controllers/panels-ctrl')

const router = express.Router()
router.get('/production', PanelsCtrl.panelsCtrl_getProduction)
router.get('/', PanelsCtrl.panelsCtrl_getPanel)
router.get('/live', PanelsCtrl.panelsCtrl_getLive)

module.exports = router