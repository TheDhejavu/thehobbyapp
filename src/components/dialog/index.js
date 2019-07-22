import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";


class Dialog_{
    constructor(){
        this.props = {};
    }
    handleYesButton(evt){
        evt.preventDefault();
        this.props.callback && this.props.callback();
        this.close();
    }
    handleNoButton(evt){
        evt.preventDefault();
        this.close();
    }
    close(){
        
         // zoom open dialog
         this.dialog.style.transform = `scale(1.1)`;
         this.dialog.style.opacity = 0;
         this.dialog.style.WebkitTransform = `scale(1.1)`;
         this.dialog.style.visibility = `hidden`;

         // hide overlay
         this.dialogOverlay.style.opacity = 0;
         this.dialogOverlay.style.visibility = "hidden";
    }
    open( props ){


        this.dialogContainer = document.querySelector(".js-dialog-container");
        this.dialog = document.querySelector(".js-dialog");
        this.dialogOverlay = document.querySelector(".js-dialog-overlay");
        this.title = this.dialogContainer.querySelector(".js-dialog-title");
        this.message = this.dialogContainer.querySelector(".js-dialog-message");
        this.yesButton = this.dialogContainer.querySelector(".js-dialog-yes__button");
        this.noButton = this.dialogContainer.querySelector(".js-dialog-no__button");


        this.yesButton.addEventListener("click", this.handleYesButton.bind(this));
        this.noButton.addEventListener("click", this.handleNoButton.bind(this))
        this.dialogOverlay.addEventListener("click", this.close.bind(this));

        this.props = props;
        this.title.innerHTML = props.title;
        this.message.innerHTML = props.message;
        // zoom open dialog
        this.dialog.style.transform = `scale(1)`;
        this.dialog.style.opacity =1;
        this.dialog.style.WebkitTransform = `scale(1)`;
        this.dialog.style.visibility = `visible`;

        // show overlay
        this.dialogOverlay.style.opacity = 0.1;
        this.dialogOverlay.style.visibility = "visible";
    }
}

class DialogContainer extends Component{
    constructor( props){
        super(props)
     }
    render(){

        return (
            <div className="dialog-container js-dialog-container" >
                <div
                    className="overlay js-dialog-overlay"

                />
                <div className="dialog js-dialog">
                    <div className="dialog--main">
                        <h3 className="title js-dialog-title"> </h3>
                        <p className="message js-dialog-message"></p>
                    </div>
                    <div className="dialog--bottom">
                        <button
                            className="btn btn--one reset-btn js-dialog-yes__button"
                        >
                            YES
                        </button>
                        <button
                            className="btn btn--two reset-btn js-dialog-no__button"
                        >
                            NO
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

const Dialog = new Dialog_();

export {
    DialogContainer,
    Dialog
};

