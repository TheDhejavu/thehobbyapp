import React from 'react';
import { PulseLoader } from 'react-spinners';
import "./styles.scss";

const Button = props => {
    let buttonValue = (props.isLoading)? props.value: props.value;
    let buttonClassNames = "ripple btn form-btn color-pink-btn dash-size-btn";
    if (props.isLoading) {
        buttonState = 'button-disabled';
    }
    return (
        <button
        type="submit"
        className={buttonClassNames}
        >
        {buttonValue}
        </button>
    )
}
const FormButton = props => {
    let value = (props.isLoading)
                        ?
                         <PulseLoader size={15} color={"#fff"}/>
                        :
                         props.value;
    let DOMprops = {};
    let className= "ripple btn form-btn color-pink-btn dash-size-btn";
    if (props.isLoading || !props.isFormValid ) {
        DOMprops["disabled"] = true;
    }
    let valueIcon
    if(props.icon){
        valueIcon = <i className="uil uil-message"></i>
    }

    return (
        <div className="form-group text-center">
            <button
                type="submit"
                className={className}
                {...DOMprops}
            >
            {value}
            </button>
        </div>
    )
}

export {
    Button,
    FormButton
}