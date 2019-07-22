/**
 * HTTP Server Settings
 * (sails.config.http)
 *
 * Configuration for the underlying HTTP server in Sails.
 * (for additional recommended settings, see `config/env/production.js`)
 *
 * For more information on configuration, check out:
 * https://sailsjs.com/config/http
 */

module.exports.http = {

  /****************************************************************************
  *                                                                           *
  * Sails/Express middleware to run for every HTTP request.                   *
  * (Only applies to HTTP requests -- not virtual WebSocket requests.)        *
  *                                                                           *
  * https://sailsjs.com/documentation/concepts/middleware                     *
  *                                                                           *
  ****************************************************************************/

  middleware: {

    /***************************************************************************
    *                                                                          *
    * The order in which middleware should be run for HTTP requests.           *
    * (This Sails app's routes are handled by the "router" middleware below.)  *
    *                                                                          *
    ***************************************************************************/
   order: [
    'cookieParser',
    'session',
    'passportInit',            // <==== If you're using "passport", you'll want to have its two
    'passportSession',         // <==== middleware functions run after "session".
    'bodyParser',
    'compress',
    'logger',                  // <==== We can put other, custom HTTP middleware like this wherever we want.
    'poweredBy',
    'router',
    'www',
    'favicon',
  ],


  // An example of a custom HTTP middleware function:
  logger: (function (){
    console.log('Initializing `logger` (HTTP middleware)...');
    return function (req,res,next) {
      console.log('Received HTTP request: '+req.method+' '+req.path);
      return next();
    };
  })(),

  // An example of a couple of 3rd-party HTTP middleware functions:
  // (notice that this time we're using an existing middleware library from npm)
  passportInit    : (function (){
    var passport = require('passport');
    var reqResNextFn = passport.initialize();
    return reqResNextFn;
  })(),

  passportSession : (function (){
    var passport = require('passport');
    var reqResNextFn = passport.session();
    return reqResNextFn;
  })()

    /***************************************************************************
    *                                                                          *
    * The body parser that will handle incoming multipart HTTP requests.       *
    *                                                                          *
    * https://sailsjs.com/config/http#?customizing-the-body-parser             *
    *                                                                          *
    ***************************************************************************/

    // bodyParser: (function _configureBodyParser(){
    //   var skipper = require('skipper');
    //   var middlewareFn = skipper({ strict: true });
    //   return middlewareFn;
    // })(),

  },

};
