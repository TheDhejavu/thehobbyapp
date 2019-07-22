var Sails = require('sails');
var app;
  // Gets run before each test
  before(function beforeControllerTest(done) {
    this.timeout(160000);
    // Lift Sails and start the server
    Sails.lift({

      log: {
        level: 'error'
      },

    }, function(err, sails) {

      // Instantiates new sails application
      app = sails;
      console.log( err)

      // Lets testing framework know async call is done
      done(err, sails);
    });
  });

  // Gets run after each test
  after(function afterControllerTest(done){

    // Destroys application
    app.lower(done);

  });