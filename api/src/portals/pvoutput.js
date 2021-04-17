const axios = require('axios')
const moment = require('moment')

parseResponse = (data) => {
    var result = data.split(';').map(e => e.split(','));
    //console.log(`Result ${result}`)
    // console.log(`\n\nResult[0] ${result[0]}`)
    // console.log(`Result[1] ${result[1]}`)
    // console.log(`\n\nResult[0][0] ${result[0][0]}`)
    // console.log(`Result[0][1] ${result[0][1]}`)
    // console.log(`Result[0][2] ${result[0][2]}`)
    // console.log(`Result[0][3] ${result[0][3]}`)
    return result
}

getProduction = async (req, numProductions) => {
    const API_KEY = '7df3ab93a0938d4acd4a261917b392df6915d076'
    const SID1 = 4612
    const SID = 82698

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
        // THIS IS FOR GETTING DAILY TOTAL OUTPUT, so update time is always 00:00 of the day
        const response = await axios.get(`https://pvoutput.org/service/r2/getoutput.jsp`, getOutputConfig)

        const responseHeaders = JSON.stringify(response.headers)
        const data = response.data
        const status = response.status
        
        const parsedData = parseResponse(data)
        const parsedDataRecent = parsedData.slice(0, Math.min(numProductions, parsedData.length))
        
        // Get Exact Update Time of Today
        const responseHourly = await axios.get('https://pvoutput.org/service/r2/getstatus.jsp', getStatusConfig)
        const parsedDataHourly = parseResponse(responseHourly.data)
        const recentDataHourly = parsedDataHourly[0]
        const parsedDataRecentDay = parsedDataRecent[0]
        console.log(`Haha parse data recent ${parsedDataRecent}\n${parsedDataRecentDay[0]} \n${recentDataHourly[0]}`)
        if(true || parsedDataRecentDay[0] == recentDataHourly[0]) {
            console.log(`Haha parse data recent same ${parsedDataRecent}\n`)
            const formattedHour = recentDataHourly[1].replace(':','')
            parsedDataRecentDay[0] = `${recentDataHourly[0]} ${formattedHour}`
        } 
        console.log(`Haha parse data recent end ${parsedDataRecent}\n`)
        const parsedDataRecentSorted = parsedDataRecent.sort((a,b) => moment(a[0]) - moment(b[0])) // [Oldest .... Recent]
        return parsedDataRecentSorted
    } catch (err) {
        console.log(`Error: PVOutput GetDailyProduction error: ${err}`)
        return null;
    }
}

// getDailyProduction = async (numProductions) => {
//     const API_KEY = '7df3ab93a0938d4acd4a261917b392df6915d076'
//     const SID1 = 4612
//     const SID = 82698

//     const getOutputConfig = {
//         params: {
//             'sid1': SID1,
//             'a': 'd'
//         },
//         headers: {
//             'X-Pvoutput-Apikey': API_KEY,
//             'X-Pvoutput-SystemId': SID,
//             'X-Rate-Limit': 1
//         }
//     }

//     const getStatusConfig = {
//         params: {
//             'sid1': SID1,
//             'h': '1',
//             'limit': '288',
//         },
//         headers: {
//             'X-Pvoutput-Apikey': API_KEY,
//             'X-Pvoutput-SystemId': SID,
//             'X-Rate-Limit': 1
//         }
//     }

//     try {
//         // THIS IS FOR GETTING DAILY TOTAL OUTPUT, so update time is always 00:00 of the day
//         const response = await axios.get(`https://pvoutput.org/service/r2/getoutput.jsp`, getOutputConfig)

//         const responseHeaders = JSON.stringify(response.headers)
//         const data = response.data
//         const status = response.status
        
//         const parsedData = parseResponse(data)
//         const parsedDataRecent = parsedData.slice(0, Math.min(numProductions, parsedData.length))
        
//         // Get Exact Update Time of Today
//         const responseHourly = await axios.get('https://pvoutput.org/service/r2/getstatus.jsp', getStatusConfig)
//         const parsedDataHourly = parseResponse(responseHourly.data)
//         const recentDataHourly = parsedDataHourly[0]
//         const parsedDataRecentDay = parsedDataRecent[0]
//         if(parsedDataRecentDay[0] == recentDataHourly[0]) {
//             const formattedHour = recentDataHourly[1].replace(':','')
//             parsedDataRecentDay[0] = `${recentDataHourly[0]} ${formattedHour}`
//             // console.log(`Exact time to moment -----   parsedDataRecentDay`)
//         } 

//         const parsedDataRecentSorted = parsedDataRecent.sort((a,b) => moment(a[0]) - moment(b[0])) // [Oldest .... Recent]
//         // console.log(`PVOutput GetDailyProduction response:\n ${status} \n ${responseHeaders} \n ${parsedDataRecentSorted.length}`)
//         return parsedDataRecentSorted
//     } catch (err) {
//         console.log(`Error: PVOutput GetDailyProduction error: ${err}`)
//         return null;
//     }
// }

// getMonthlyProduction = async (numProductions) => {
//     const API_KEY = '7df3ab93a0938d4acd4a261917b392df6915d076'
//     const SID1 = 4612
//     const SID = 82698

//     const getOutputConfig = {
//         params: {
//             'sid1': SID1,
//             'a': 'm'
//         },
//         headers: {
//             'X-Pvoutput-Apikey': API_KEY,
//             'X-Pvoutput-SystemId': SID,
//             'X-Rate-Limit': 1
//         }
//     }

//     try {
//         // THIS IS FOR GETTING DAILY TOTAL OUTPUT, so update time is always 00:00 of the day
//         const response = await axios.get(`https://pvoutput.org/service/r2/getoutput.jsp`, getOutputConfig)

//         const responseHeaders = JSON.stringify(response.headers)
//         const data = response.data
//         const status = response.status
        
//         const parsedData = parseResponse(data)
//         const parsedDataRecent = parsedData.slice(0, Math.min(numProductions, parsedData.length))
        
//         // // Get Exact Update Time of Today
//         const responseHourly = await axios.get('https://pvoutput.org/service/r2/getstatus.jsp', getStatusConfig)
//         const parsedDataHourly = parseResponse(responseHourly.data)
//         const recentDataHourly = parsedDataHourly[0]
//         const parsedDataRecentDay = parsedDataRecent[0]
//         if(parsedDataRecentDay[0] == recentDataHourly[0]) {
//             const formattedHour = recentDataHourly[1].replace(':','')
//             parsedDataRecentDay[0] = `${recentDataHourly[0]} ${formattedHour}`
//             // console.log(`Exact time to moment -----   parsedDataRecentDay`)
//         } 

//         const parsedDataRecentSorted = parsedDataRecent.sort((a,b) => moment(a[0]) - moment(b[0])) // [Oldest .... Recent]
//         // console.log(`PVOutput GetDailyProduction response:\n ${status} \n ${responseHeaders} \n ${parsedDataRecentSorted.length}`)
//         return parsedDataRecentSorted
//     } catch (err) {
//         console.log(`Error: PVOutput GetDailyProduction error: ${err}`)
//         return null;
//     }
// }



module.exports = {
    getProduction,
}