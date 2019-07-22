import React from 'react';
import Fade from 'react-reveal';

const TextInput = props => {
    let formControl = "form-control";
    // console.log( props.touched, props.error)
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
                type="text"
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

export default TextInput;