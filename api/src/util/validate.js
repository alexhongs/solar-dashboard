const PVOutput = require("../portals/pvoutput")

validatePanel = async (data) => {
    if(!data) return null

    // TODO: if (pvoutput)
    const apikey = data.apikey
    const sid = data.sid
    if (!apikey || !sid) return {error: "Missing 'sid' or 'apikey'", isValid: false}

    return await PVOutput.pvoutput_validatePanel(apikey, sid) 
}

validateCreateUserInput = (req) => {
    let error = ""
    if(!req) error = "Missing request"
    
    if(!req.headers)  error = "Missing request header"

    if(!req.headers.apikey)  error = "Missing 'apikey'"

    if(!req.headers.name)  error = "Missing 'name'"

    if(!req.headers.username)  error = "Missing 'username'"

    if(!req.headers.password)  error = "Missing 'password'"

    if(!req.headers.sid)  error = "Missing 'sid'"

    return {isValid: error == "", error: error}
}

validateLoginInput = (req, res) => {
    let error = ""
    if(!req || !req.headers) error = "Missing request header"

    if(!req.headers.username) error = "Missing 'username'"

    if(!req.headers.password) error = "Missing 'password'"

    return {isValid: error == "", error: error}
}

module.exports = {
    validateLoginInput,
    validatePanel,
    validateCreateUserInput,
}