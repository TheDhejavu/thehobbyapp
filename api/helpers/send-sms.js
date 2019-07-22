var twilio = require('twilio');
require("dotenv").config();
var client = new twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = {


  friendlyName: 'Send sms',


  description: '',


  inputs: {

    phone_number:{
      type: "string",
      required: true
    },
    body:{
      type: "string",
      required: true
    },
  },


  exits: {

    success: {
      description: 'All done.',
    },

  },


  fn: function (inputs) {

    return client.messages.create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: inputs.phone_number,
      body: inputs.body
    })
  }
};

