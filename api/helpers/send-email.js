const mailgun = require("mailgun-js");
require('dotenv').config();
const DOMAIN = "sandbox9aa8bfbec4ea4c57a08e18a8034e2e5c.mailgun.org";
const mg = mailgun({apiKey: process.env.MAILGUN_API_KEY, domain: DOMAIN});

module.exports = {


  friendlyName: 'Send email',


  description: 'This method handles sending of email using mailgun',


  inputs: {
    to:{
      type: "string",
      required:true
    },
    text:{
      type: "string",
      required: true
    }
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn:function (inputs) {

    const msg = {
      to: inputs.to,
      from: 'Thehobbyapp@mailgun.com',
      subject: 'New Notification from Thehobbyapp',
      text: inputs.text
    };
    return mg.messages().send(msg);
  }


};

