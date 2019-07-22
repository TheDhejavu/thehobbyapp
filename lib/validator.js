/**
 * App.validators....
 *
 * @author Akinola Ayodeji
 * @github @theDhejavu
 *
 *
 * @version 1.0
 *
 * USE CASE
 *  //Validation Rule
      @const validationRule = {
          "email": {
              isEmail: {
                    message: "Invalid email address"
              },
              isRequired: true,

                // This can be use to run user defined validation functions
              isHandlers:{
                  "isTaken": ()=>{}
              }
          },
      }

      @const validator = new validators({
          "validationRule": validationRule,
      });
      @const validation = await validator.init( request.body )

      @validation.Errors()  // returns boolean ( TRUE OR FALSE);

      @validation.validationErrors // returns all validation errors;
 */

class validators {
    constructor( props ){
        this.multipleErrorPerKey = props.multipleErrorPerKey || null;
        this.validationErrors = {};
        this.validationRule = {};
        this.items = {};
        this.ignoreKeys = props.ignoreKeys || [];

        Object.assign(this.validationRule, props.validationRule)
    }
    setIgnoreKeys( keys ){
        if(keys.map){
            keys.forEach( key=> {
                if(!this.ignoreKeys.includes(key))
                    this.ignoreKeys.push( key)
            });
        }else{
            if(!this.ignoreKeys.includes(key))
            this.ignoreKeys.push(keys);
        }

    }
    unsetIgnoreKeys( keys ){
        if(keys.map){
            keys.forEach( key=> {
                const index = this.ignoreKeys.indexOf( key);

                if(index > -1)
                this.ignoreKeys.splice(index, 1)
            });
        }else{
            const index = this.ignoreKeys.indexOf( keys );
            if(index > -1)
            this.ignoreKeys.splice(index, 1)
        }

    }
    Errors(){
        let error = false;
        if(this.validationErrors){
            for(let key in this.validationErrors){
                let validation = this.validationErrors[key];
                if(validation.error){
                    error = true;
                    break;
                }
            }
        }else{
            error = false;
        }
        return error
    }
    async init( items ){
        this.items = items;
        for(var key in this.validationRule ){

            if(!this.ignoreKeys.includes(key)){
                if(this.validationRule.hasOwnProperty(key))
                {
                    const value = items[key] || "";
                    await this.validate(key, value);
                }
            }else{
                if(this.validationErrors.hasOwnProperty(key))
                delete this.validationErrors[key];
            }
        }

        return this;
    }
    async validate(key, value){
        let rules = this.validationRule[key];
        let validator;
        for(let rule in rules){

            validator = this.validators()[rule];
            if(typeof validator !== "function")
            throw new Error(`VALIDATION ERROR: Validation rule for ${rule} is not available.`);

            validator = await validator(key, value);
            if(validator && validator.error && !this.multipleErrorPerKey){
                break;
            }
        }

        return validator;
    }
    handleNumber(key, value){
        const rule = this.validationRule[key];
        if(value != "" && !Number.isInteger(parseInt(value))){
            const message = rule["isNumber"].message || "This field must be an integer";
            if(!this.validationErrors[key])
            this.validationErrors[key] = {};

            this.validationErrors[key]["error"] = true;
            this.validationErrors[key]["message"] = message;
            return this.validationErrors[key];
        }else{
            return null
        }
    }
    handleLetter(key, value){
        const rule = this.validationRule[key];
        if(value != "" && Number.isInteger(parseInt(value))){
            const message = rule["isLetter"].message || "This field must be a letter";
            if(!this.validationErrors[key])
            this.validationErrors[key] = {};

            this.validationErrors[key]["error"] = true;
            this.validationErrors[key]["message"] = message;
            return this.validationErrors[key];
        }else{
            return null
        }
    }
    handleRequired(key, value){
        const rule = this.validationRule[key];
        if(value == ""){
            const message = rule["isRequired"].message || "This field cannot be left blank.";
            if(!this.validationErrors[key])
            this.validationErrors[key] = {};

            this.validationErrors[key]["error"] = true;
            this.validationErrors[key]["message"] = message;
            return this.validationErrors[key];
        }else{
            return null
        }
    }
    handleCardNo(key, value){}
    handleCardCCV(key, value){}
    handleCardCardExpiry(key, value){}
    lengthHandlers(){
        return {
            "$eq": (value, options)=>{
                const len = options.length || options;
                const message = options.message || `This value must be ${len} characters long.`;
                if(value.length != len){
                    return { error: true, message: message}
                }else{
                    return { error: false }
                }
            },
            "$nlt":(value, options)=>{
                const len = options.length || options;
                const message = options.message || `This value must be atleast ${len} characters long.`
                if(value.length < len){
                    return { error: true, message: message}
                }else{
                    return { error: false }
                }
            },
            "$ngt":(value, options)=>{
                const len = options.length || options;
                const message = options.message || `This value must not be greater than ${len} characters`;
                if(value.length > len){
                    return { error: true, message: message}
                }else{
                    return { error: false }
                }
            }
        }
    }
    handleLength(key, value){
        const operators = ["$eq","$ngt", "$nlt"];
        const rule = this.validationRule[key]["isLength"];
        value = value.toString().replace(/ /g,"");

        for(let operator in rule){

            if(!operators.includes(operator)){
                throw new Error(`ERROR: ${opeartor} is an invalid operator.`);
            }else{
                const lengthHandlers = this.lengthHandlers();
                let options = rule[operator];
                const validationHandler = lengthHandlers[operator](value, options);
                if(validationHandler.error){
                    this.validationErrors[key] = validationHandler;
                    break;
                }
            }
        }
        return this.validationErrors[key];
    }

    handleEmail(key, value){
        const rule = this.validationRule[key]["isEmail"];
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/mg;
        const isEmail = regex.exec(value);
        if(value !== "" && !isEmail){
            const message = rule.message || `Email address is not valid.`;
            if(!this.validationErrors[key])
            this.validationErrors[key] = {};

            this.validationErrors[key]["error"] = true;
            this.validationErrors[key]["message"] = message;
            return this.validationErrors[key];
        }else{
            return null
        }
    }
    handleEqual(key, value){
        const rule = this.validationRule[key]["isEqual"];

        if(this.items[rule.key] !== value){
            const message = rule.message || `This field do not match`;
            if(!this.validationErrors[key])
            this.validationErrors[key] = {};

            this.validationErrors[key]["error"] = true;
            this.validationErrors[key]["message"] = message;
            return this.validationErrors[key];
        }else{
            return null
        }
    }
    async handleHandlers(key, value){
        const rule = this.validationRule[key]["isHandlers"];
        for(let handler in rule){
            const currentHandler = rule[handler];
            const parameter= this.items;

            const validationHandler = await currentHandler(parameter);
            if(validationHandler.error){
                this.validationErrors[key] = validationHandler;
                break;
            }
        }
        return this.validationErrors[key];
    }
    validators(){
        return {
            "isNumber": this.handleNumber.bind(this),
            "isLetter": this.handleLetter.bind(this),
            "isRequired": this.handleRequired.bind(this),
            "isCardNo": this.handleCardNo.bind(this),
            "isCardCCV": this.handleCardCCV.bind(this),
            "isCardExpiry": this.handleCardCardExpiry.bind(this),
            "isLength": this.handleLength.bind(this),
            "isEmail": this.handleEmail.bind(this),
            "isHandlers": this.handleHandlers.bind(this),
            "isEqual": this.handleEqual.bind(this),
        }
    }
  }
  module.exports = validators

