const bcrypt = require('bcrypt');

module.exports = {


  friendlyName: 'Hash password',


  description: 'Hash the new users password to for security purposes',

  inputs: {

   user: {
      type: 'ref',
      required: true
    },

  },

  fn: async function( inputs ){
    let user = inputs.user;
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash;
  },
};

