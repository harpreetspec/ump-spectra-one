const db = require("../lib/mysql");
const Config = require("../helpers/constantdata/config")
const axios = require("axios")
var soap = require('soap');
const logger = require("../helpers/apiLogger");
const moment = require('moment');
const { WAlogger } = require("../helpers/apiLogger");
const { format } = require('date-fns');



exports.getwhatsAppWebhookServices = async (req) => {

    return new Promise(async (resolve, reject) => {
        // let logData = {
        //     "dt": format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
        //     "source": "CRM",
        //     "apiName": "getAccountStatus",
        //     "Request": req.query
        // }
        try {
            

            let webhookRecived = req.body;
            console.log(webhookRecived.entry[0].changes[0].value.messages[0].from);
            let mobnum = webhookRecived.entry[0].changes[0].value.messages[0].from
           let  timestamp = webhookRecived.entry[0].changes[0].value.messages[0].timestamp
            console.log("fgghhh",timestamp);
            
           
           const date = new Date(timestamp* 1000);
           
           // Extracting date components
           const day = String(date.getDate()).padStart(2, '0');
           const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
           const year = String(date.getFullYear()); // Get the last two digits of the year
           const hours = String(date.getHours()).padStart(2, '0');
           const minutes = String(date.getMinutes()).padStart(2, '0');
           
           // Formatting the date
           const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;
           console.log(formattedDate);
            
            resolve(webhookRecived)
        } catch (error) {
            // let finalLog = { ...logData, "Response": { code: "404", "error": error.message } }
            // WAlogger.info(JSON.stringify(finalLog))
            reject(error)
        }
    })
}