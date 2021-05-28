const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const db = require('./db')
const panelsRouter = require('./src/routes/panels-router')
const usersRouter = require('./src/routes/users-router')

const PVOutputScraper = require('./src/portals/pvoutput_scraper')

const app = express()
const apiPort = 9000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', (req, res) => {
    res.send('Solar Dashboard Server. Running')
})

app.get('/testAPI', async (req, res) => {
    const panel = {id: `5778`, sid: `4612`}
    const data = await PVOutputScraper.pvoutput_getAllStatistic('Pennsylvania')

    res.status(200).json({success: true, data: data})
})

app.use('/panels', panelsRouter)
app.use('/users', usersRouter)

app.listen(apiPort, () => console.log(`Server running on port ${apiPort}`))