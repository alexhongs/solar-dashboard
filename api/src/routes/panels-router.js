const express = require('express')

const PanelsCtrl = require('../controllers/panels-ctrl')

const router = express.Router()
router.get('/production', PanelsCtrl.getProduction)
router.get('/', PanelsCtrl.getPanel)
router.post('/', PanelsCtrl.createPanel)

module.exports = router