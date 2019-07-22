/**
 * HobbyController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

let striptags = require('striptags');
var shortid = require('shortid');

module.exports = {
  list: async function(req, res){
    const { id : userId } = req.user;
    try{
      const hobbies = await  Hobby.find({ userId }).sort('id ASC');

      return res.ok({ hobbies })
    }catch(error){
      return res.serverError(error, null, "Something went wrong")
    }

  },
  create: async function(req, res){

    let { id: userId } = req.user;
    let { name } = req.body;

    if(!name || name == ""){
      return res.badRequest(null, null, "Hobby name is missing")
    }

    try{
      let uid = shortid.generate();
      let data = {
        name:  striptags(name),
        userId: userId,
        uid: uid
      }
      await  Hobby.create( data )
      //This part wasn't suppose to be here but due to an issue
      //i encountrered while using the .fetch() method on create made me to add this.. ,
      let hobby = await Hobby.findOne({ uid })

      let body = `Hello! ${req.user.fullName}, you just added ${req.body.name} to your hobbies`;
      //This sends the newly created hobby as sms using twilio.
      //I'm currently using twilio trial account and only registered phone numbers wth this account will be allowed.

      await sails.helpers.sendSms(req.user.phoneNumber, body);
      //This sends the newly created hobby as email using mailgun,
      //i tried using twilio sendgrid but emails weren't delivering..
      await sails.helpers.sendEmail(req.user.email, body);

      if(hobby){
        return res.created(hobby);
      }else{
        return res.badRequest(null, null, "Something went wrong")
      }
    }catch(error){
      console.log( error );
      return res.serverError(error)
    }
  },
  delete: async function(req, res){
    let { id: userId } = req.user;
    let { id: hobbyId } = req.params;
    if(!hobbyId){
      return res.badRequest(null, null, "Missing credential")
    }

    try{
      let hobby = await  Hobby.destroyOne({id: hobbyId, userId});

      if(hobby){
        return res.ok({hobby});
      }else{
        return res.badRequest(null, null, "Something went wrong")
      }
    }catch(error){

      return res.serverError(error)
    }
  }
};

