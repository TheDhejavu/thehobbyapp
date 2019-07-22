
const isAllControlsValid = ( formControls )=>{
      let errorStack = [];
      for( let label in formControls){

        let controlValue = formControls[label].value;
        let controlRules = formControls[label].validationRules;
        let controlLabel = formControls[label].label;
        let error = validate(controlValue, controlLabel, controlRules);

        if(error.error)
        errorStack.push(error);
    }

    return (errorStack.length >= 1)? false : true;
}
const validate = (value, label, rules) => {
    let validator = { error: false, message: ""};

    for (let rule in rules) {
        validator = validators[rule];

        if(typeof validator !== "function")
        throw new Error(`VALIDATION ERROR: Validation rule for ${rule} is not available.`);

        validator = validator(value, label, rules[rule]);

        if(validator && validator.error){
            break;
        }
    }

    return validator;
  }


  /**
   * minLength Val
   * @param  value
   * @param  label
   * @param  minLength
   * @return
   */
  const handleMinLength = (value, label, minLength) => {
      const valid =  value.length > minLength;
      if(!valid){
        return { error: true, message: `${label} must have a minimum length of ${minLength}`}
      }
      return {error: false, message:""}
  }

  /**
   * Check to confirm that feild is required
   * @param  label
   * @param  value
   * @return
   */
  const handleRequired = (value , label)=> {

      const valid =  value.trim() !== '';
      if(!valid){
        return { error: true, message: `${label} is required`}
      }
      return {error: false, message:""}
  }

  /**
   * Email validation
   * @param  label
   * @param value
   * @return
   */
  const handleEmail = (value, label) => {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const valid = re.test(String(value).toLowerCase());

      if(!valid){
        return { error: true, message: `${label} is not valid`}
      }
      return {error: false, message:""}
  }


  const validators = {

    'minLength': handleMinLength,

    'isRequired':handleRequired,

    'isEmail': handleEmail
}
  export default validate;

  export {
    isAllControlsValid
  }