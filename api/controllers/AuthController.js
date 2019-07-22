/**
 * AuthController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const passport = require('passport');

module.exports = {
    login: function(req, res) {
        passport.authenticate('auth-login', async function(err, user, info) {
            if (err) {
                return res.serverError(err)
            }
            if (user) {

                const token = await sails.helpers.generateJwt( user );
                const data =  {  token , user};
                /** assign our jwt to the cookie */
                res.cookie('jwt', token, { httpOnly: true, secure: true });
                res.ok(data, null, info.message);
                // console.log( data )

            } else {
                res.badRequest(info.data || null, info.code, info.message);
            }

        })(req, res);
   },
    signup: function(req, res) {
        passport.authenticate('auth-signup', async function(err, user, info) {

            if (err) {
                return res.serverError(err)
            }
            if (user) {

                const token = await sails.helpers.generateJwt( user );
                const data =  {  token, user };
                /** assign our jwt to the cookie */
                res.cookie('jwt', token, { httpOnly: true, secure: true });
                res.created(data, null, info.message);
                // console.log( data )

            } else {
                res.badRequest(info.data || null, info.code, info.message);
            }

        })(req, res);
    },
    logout: function(req, res) {
        req.logout();
        res.ok(null, null, "logged out successfully.");
    }
};