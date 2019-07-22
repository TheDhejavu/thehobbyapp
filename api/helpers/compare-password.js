const bcrypt = require('bcrypt');

module.exports = {


  friendlyName: 'Compare password',


  description: 'Compares the user provided password with the stored user password',

  inputs: {

    password: {
      type: 'string',
      required: true
    },
    dbPassword: {
      type: 'string',
      required: true
    }
  },

  fn: async function( inputs ){

    return bcrypt.compareSync(inputs.password, inputs.dbPassword);
  },
};

