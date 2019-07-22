const jwt = require('jsonwebtoken');

module.exports = {


  friendlyName: 'Generate jwt',


  description: 'Generate jason web token from user',


  inputs: {
    user:{
      type: "ref",
      requred: true,
    }
  },
  fn: async function( inputs ) {
    const user = inputs.user;
    // console.log( user);
    return jwt.sign(
      {
        id: user.id,
        email: user.email,
        avatar: user.avatar
      },
      sails.config.jwtSettings.secret,
      {
        algorithm: sails.config.jwtSettings.algorithm,
        expiresIn: sails.config.jwtSettings.expiresIn,
        issuer: sails.config.jwtSettings.issuer,
        audience: sails.config.jwtSettings.audience,
      }
    );
  }
};

