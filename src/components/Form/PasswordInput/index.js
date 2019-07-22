import React from 'react';
import { Link } from "react-router-dom";
import Fade from 'react-reveal';

const PasswordInput = props => {
    let formControl = "form-control";

    if (props.touched && props.error) {
        formControl = 'form-control control-error';
    }


    let DOMProps = { ...props};
    delete DOMProps.touched;
    delete DOMProps.error;

    return (
        <div className="form-group">
            <label className="form-label" htmlFor={props.id}>{props.label}:</label>

            <input
                type="password"
                className={formControl} {...DOMProps}
                required= {true}
                autoComplete = "false"
            />
            <Fade collapse when={props.error}>
                <div className="form-message error">
                    {props.message}
                </div>
            </Fade>
        </div>
    )
}

export default PasswordInput;