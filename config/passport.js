let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
const Axios = require('axios');
require('dotenv').config();
const { ExtractJwt, Strategy: JwtStrategy } = require('passport-jwt');
const JWT_SECRET = process.env.JWT_SECRET;
const EXPIRIES_IN = '365d';
const ALGORITHM = "HS256";
const ISSUER = "hobbyapp.herokuapp.com";
const AUDIENCE = "hobbypapp.herokuapp.com";
const Validator = require("../lib/validator")
let striptags = require('striptags');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
    passReqToCallback: true,
};

passport.use(
    new JwtStrategy(opts, (req, payload, done) => {

        if (Date.now() > payload.expires) {
            return done('Authentication token has expired');
        }
        //find the user in db if needed
        return User.findOne(payload.id)
            .then(user => {
                if (user) {
                    req.user = user;
                    return done(null, user);
                }
                done(null, false, {
                    code: "E_UNAUTHORIZED",
                    message: 'Unauthorized Acesss',
                });
            })
            .catch(err => {
                return done(err);
            });
    }),
);

passport.use(
    'auth-login',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done)=>{
        try {
            let user = await User.findOne({ email});

            if (!user)
            return done(null, false, {
                code:"E_INCORRECT_CREDENTIALS",
                message: 'Incorrect email or password.',

            });

            let match = await sails.helpers.comparePassword(password, user.password);

            if (!match)
            return done(null, false, {
                code: "E_INCORRECT_CREDENTIALS",
                message: 'Incorrect email or password.',
            });

            return done(null, user, {
                message: 'Logged In Successfully',
            });
        } catch (error) {
            console.log( error)
            return done(error);
        }
    })
);

passport.use(
    'auth-signup',
    new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
    },
    async (req, email, password, done)=>{

        const validationRule = {
            "fullname": {
                isRequired: {
                    message: "Your name is required"
                },
            },
            "email": {
                isEmail: {
                    message: "Email is not valid."
                },
                isRequired: true,
                isHandlers:{
                    "isTaken": isEmailTaken,
                }
            },
            "phone_number": {
                isRequired: true,
                isHandlers:{
                    "isTaken": isPhoneNumberTaken,
                    "isNumverify": numverify
                }
            },
            "password": {
                isRequired: true,
                isLength:{
                    "$nlt": {
                        "length":6,
                        "message": "Password Must be atleast six(6) characters"
                    }
                }
            },
        }


        try{
            let { fullname,phone_number} = req.body;
            const validator = new Validator({
                "validationRule": validationRule,
              });

              const validation = await validator.init( req.body );

              if(validation.Errors())
              return done(null, false, {
                  code: "E_VALIDATION_ERROR",
                  message: 'An error occurred',
                  data: {
                      errors:  validation.validationErrors
                  }
              });
            phone_number = phone_number.replace(/[^0-9]/g, '');
            phone_number = `+${phone_number}`;

            let user = await User.create(_.omit({
                fullName: striptags(fullname),
                email: striptags(email),
                phoneNumber: phone_number,
                password: password
            }, "id"));

            user = await User.findOne({ email })
            if(user){
                return done(null, user, {
                    code: "CREATED",
                    message: 'User created successfully',
                });
            }else{
                return done(null, user, {
                    code: "E_FETCH_NEW_USER",
                    message: 'An error occurred while fetching new user',
                });
            }
          } catch (err) {
              console.log( err )
            return done(err);
          }
    })
);

const isPhoneNumberTaken = async ( params )=>{

    let phoneNumber = params.phone_number;
    const taken = await User.findOne({ phoneNumber });

    if(taken){
        return { error: true,  message: "Phone number already has already being taken"}
    }else{
        return { error: false}
    }
}

const isEmailTaken =async ( params )=>{

    let email = params.email;
    const taken = await User.findOne({ email });

    if(taken){
        return { error: true,  message: "Email address has already being taken"}
    }else{
        return { error: false}
    }
};

const numverify = async ({phone_number})=>{
    const url = ` http://apilayer.net/api/validate?access_key=${process.env.NUMVERIFY_API_KEY}&number=${phone_number}`;

    try{
        const response = await Axios.get(url);
        if(!response.data.valid){
            return { error: true,  message: "Phone number is not valid"}
        }else{
            return { error: false}
        }
    }catch(error){
        console.log( error);
        return { error: true,  message: "We couldn't validate your phone number"}
    }
}


module.exports.jwtSettings = {
    expiresIn: EXPIRIES_IN,
    secret: JWT_SECRET,
    algorithm : ALGORITHM,
    issuer : ISSUER,
    audience : AUDIENCE
  };