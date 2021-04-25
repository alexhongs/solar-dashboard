const jsdom = require("jsdom")
const { JSDOM } = jsdom

const axios = require("axios")
const jquery = require("jquery")

pvoutput_region_ids = async(region) => {
    try {
        
        page_number = 0
        while (page_number < 100) {        
            const URL = `https://pvoutput.org/ladder.jsp?p=${page_number}&region=${region}&country=244&o=e&d=desc`
            const response = await axios.get(URL)
            const dom = await new JSDOM(response.data)
            const a = dom.window.document.querySelectorAll('a[href*="list.jsp"]')
            a.forEach(element => {
                console.log(`${element.textContent}    ${element.getAttribute("href")}`)
                const id_sid_ = element.getAttribute("href").split("?")
                if (id_sid_[1]) {
                    const id_sid = id_sid_[1].split("&")
                    const id = id_sid[0].split("=")[1]
                    const sid = id_sid[1].split("=")[1]
                    console.log(`id: ${id}     sid: ${sid}`)
                }
            });
            page_number += 1
        }
        // console.log(dom.window.document.querySelectorAll('a'))
        // console.log(dom.window.document.getElementsByTagName('a'))
        
        // console.log(dom.window.textContent)

        // const query = jquery.querySelector("a[href*=list.jsp]")
        // console.log(query)
    } catch (e) {
        console.log(`Error: Scraping by Region Id ${e}`)
    }
}




module.exports = {
    pvoutput_region_ids,
}