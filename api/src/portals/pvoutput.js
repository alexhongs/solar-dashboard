const axios = require('axios')
const moment = require('moment')

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
            'a': req.headers.period
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
        const status = response.status
        
        const parsedData = _parseResponse(data)
        const parsedDataRecent = parsedData.slice(0, Math.min(numProductions, parsedData.length))
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
        const field = {
            date: parsedDataRecent[i][0],
            magnitude: period == "d" ? parsedDataRecent[i][1] : parsedDataRecent[i][2],
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

    const field = {
        date: parsedData[7],
        magnitude: parsedData[0]
    }
    console.log(`data   ${data} parsed${parsedData}  field${field}`);
    return [field]
}
module.exports = {
    pvoutput_getProduction,
}