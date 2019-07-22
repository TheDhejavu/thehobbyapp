/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

const bcrypt = require('bcrypt');

module.exports = {
  attributes: {
    fullName: {
      type: 'string',
      required: true,
    },
    phoneNumber: {
      type: 'string',
      required: true,
      unique: true
    },
    email: {
      type: 'string',
      required: true,
      unique: true
    },
    password: {
      type: 'string',
      required: true
    },
    avatar:{
      type: "string",
      defaultsTo: "avatar.png"
    }
  },
  customToJSON: function() {
    return _.omit(this, ['password'])
  },
  beforeCreate: async function(user, next){
    await sails.helpers.hashPassword( user );

    next();
  }
};

