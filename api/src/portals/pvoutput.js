const axios = require('axios')
const moment = require('moment')
const util = require('../util/util')

pvoutput_getProduction = async (req, numProductions) => {
    const API_KEY = '7df3ab93a0938d4acd4a261917b392df6915d076'
    const SID1 = 4612
    const SID = 82698
    let period = req.headers.period
    if(period == 'w') period = 'd' // Weekly needs to be added from daily
    if(period == 't') period = 'y' // Total needs to be added from yearly

    const getOutputConfig = {
        params: {
            'sid1': SID1,
            'a': period
        },
        headers: {
            'X-Pvoutput-Apikey': API_KEY,
            'X-Pvoutput-SystemId': SID,
            'X-Rate-Limit': 1
        }
    }

    const getStatusConfig = {
        params: {
            'sid1': SID1,
            'h': '1',
            'limit': '288',
        },
        headers: {
            'X-Pvoutput-Apikey': API_KEY,
            'X-Pvoutput-SystemId': SID,
            'X-Rate-Limit': 1
        }
    }

    try {
        if(req.headers.period == 't') return _getYearlyOutput(req.headers.period, getOutputConfig)
        // THIS IS FOR GETTING DAILY TOTAL OUTPUT, so update time is always 00:00 of the day
        const response = await axios.get(`https://pvoutput.org/service/r2/getoutput.jsp`, getOutputConfig)

        const responseHeaders = JSON.stringify(response.headers)
        const data = response.data
    
        const parsedData = _parseResponse(data)
        const numRecent =  req.headers.period == 'w' ? numProductions * 7 : numProductions;
        const parsedDataRecent = parsedData.slice(0, Math.min(numRecent, parsedData.length))
        const dataFormatted = _formatData(req, parsedDataRecent) // [dict, ... , dict]

        // Get Exact Update Time of Today
        const responseHourly = await axios.get('https://pvoutput.org/service/r2/getstatus.jsp', getStatusConfig)
        const parsedDataHourly = _parseResponse(responseHourly.data)
        const recentDataHourly = parsedDataHourly[0]

        const parsedDataRecentDay = dataFormatted[0]
        if(true || parsedDataRecentDay.date == recentDataHourly[0]) {
            const formattedHour = recentDataHourly[1].replace(':','')
            parsedDataRecentDay.date = `${recentDataHourly[0]} ${formattedHour}`
        } 
        const dataFormattedSorted = dataFormatted.sort((a,b) => moment(a.date) - moment(b.date)) // [Oldest .... Recent]
  
        if(req.headers.period == 'w') return _getWeeklyOutput(req.headers.period, dataFormattedSorted)

        return dataFormattedSorted
    } catch (err) {
        console.log(`Error: PVOutput GetDailyProduction error: ${err}`)
        return null;
    }
}

//////////////////////////
// HELPER FUNCTIONS
//////////////////////////
_parseResponse = (data) => {
    var result = data.split(';').map(e => e.split(','));
    return result
}

_formatData = (req, parsedDataRecent) => {
    const period = req.headers.period
    var result = []

    // Put params specification into a common structure
    for (i = 0; i < parsedDataRecent.length; i++) {
        const dailyQuery = period == 'd' || period == 'w'
        const date = parsedDataRecent[i][0]
        const magnitude = dailyQuery ? parsedDataRecent[i][1] : parsedDataRecent[i][2]
        const efficiency = dailyQuery ? parsedDataRecent[i][2] : parsedDataRecent[i][3]
        const year = moment(date).year()

        const field = {
            date: date,
            magnitude: magnitude,
            efficiency: efficiency,
            carbon: util.getCarbon(magnitude),
            money: util.getMoney(year, magnitude),
        }

        result.push(field)
    }
    
    return result
}

_getWeeklyOutput = async (period, formattedData) => {
    if(period != 'w') return null
    
    var result = []

    let startDayIndex = 0;
    for(i = 0; i < formattedData.length; i++) {
        const day = formattedData[i]
        const weekDay = moment(day.date).day()
        if(weekDay == `0`) {
            startDayIndex =  i;
            break;
        }
    }

    for(i = startDayIndex; i < formattedData.length; i += 7) {
        // Add 7 day production
        let weeklyProduction = 0;
        for(j = i; j < i + 7; j++) {
            if(j < formattedData.length) {
                weeklyProduction += parseInt(formattedData[j].magnitude)
            }
        }

        // Average 7 day efficiency
        let weeklyEfficiency = 0;
        let weeklyEfficiencyLength = 0;
        for(j = i; j < i + 7; j++) {
            if(j < formattedData.length) {
                weeklyEfficiency += parseInt(formattedData[j].efficiency)
                weeklyEfficiencyLength += 1
            }
        }

        const year =  moment(formattedData[i].date).year()

        // Add to Weekly List
        const field = {
            date: formattedData[i].date,
            magnitude: weeklyProduction,
            efficiency: (weeklyEfficiency / weeklyEfficiencyLength).toFixed(3),
            carbon: util.getCarbon(weeklyProduction),
            money: util.getMoney(year, weeklyProduction),
        }

        result.push(field)
    }

    return result
}


_getYearlyOutput = async (period, getOutputConfig) => {
    if(period != 't') return null

    const response = await axios.get(`https://pvoutput.org/service/r2/getstatistic.jsp`, getOutputConfig)
    const responseHeaders = JSON.stringify(response.headers)
    const data = response.data
    const status = response.status
    
    
    const parsedData = data.split(',')
    const magnitude = Number(parsedData[0])
    const year =  moment(parsedData[7]).year()
    const field = {
        date: parsedData[7],
        magnitude: magnitude,
        efficiency: parsedData[5],
        carbon: util.getCarbon(magnitude),
        money: util.getMoney(year, magnitude),
    }

    return [field]
}

module.exports = {
    pvoutput_getProduction,
}