const db = require("../lib/mysql");
const express = require("express");
const getwhatsAppWebhookService = require("../services/whatsAppWebhookServices");
const ResHelper = require("../helpers/response");
var soap = require('soap');






exports.getwhatsAppWebhookController = async (req, res, next) => {
    try {
        
      let getDetailsForWhatsapp = await getwhatsAppWebhookService.getwhatsAppWebhookServices(req);
      
      ResHelper.apiResponse(res, true, "Successfully fetched SR Status", 200, getDetailsForWhatsapp, "")
    
      
    } catch (error) {
      console.log(error);
      ResHelper.apiResponse(res, false, "Something went wrong", 404, {}, "")
    }
  }