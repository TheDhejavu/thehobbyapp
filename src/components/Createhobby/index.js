import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormButton as Button, TextInput} from "../form";
import { toast } from 'react-toastify';
import { isAllControlsValid} from "../../helpers/validate";
import "./styles.scss";
import Axios from "axios";
import {getToken, BASE_URL} from "../../helpers/auth";
import 'react-toastify/dist/ReactToastify.css';

class CreateHobby extends Component{
    constructor( props){
        super(props)
        this.state = {
            formControls: {
                name: {
                    value: '',
                    label:"Hobby",
                    touched: false,
                    placeholder: 'E.G coding',
                    validationRules: {
                        isRequired: true,
                    }
                },

            },
            isFormValid: false,
            isLoading: false,
        }

        this.handleCreateHobbyContainerClick = this.closeCreateHobby.bind(this);
        this.handleCreateHobbyClick = this.handleCreateHobbyClick.bind(this);
        this.backButtonClicked = this.closeCreateHobby.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...this.state.formControls
        };
        const updatedFormElement = {
            ...updatedControls[name]
        };
        updatedFormElement.value = value;
        updatedFormElement.touched = true;

        updatedControls[name] = updatedFormElement;



        let isFormValid = isAllControlsValid( updatedControls )

        this.setState({
            formControls: updatedControls,
            isFormValid: isFormValid
        });
    }
    stopLoading(){
        this.setState({
            ...this.state,
            isLoading: false
        });
    }
    resetState( ){
        const updatedFormControls = { ...this.state.formControls };
        updatedFormControls.name.value = "";
        updatedFormControls.name.validation = { error: false, message:""}
        this.setState({
            ...this.state,
            formControls:updatedFormControls
        });
        this.props.onSetOpen({
            isCreateHobbyOpen: false
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        if(!this.state.isFormValid)
        return toast.error("Whoops, something went wrong", {
            position: toast.POSITION.TOP_RIGHT
        });
        this.setState({
            ...this.state,
            isLoading: true
        });


        Axios.defaults.headers.Authorization = getToken();
        Axios.post(`${BASE_URL}/api/hobby`, {
            "name": this.state.formControls.name.value
        })
        .then( response=>{
           if(response.data.code == "CREATED"){
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });

                this.props.updateContent( response.data.data )
           }
           this.resetState();
           this.stopLoading();
        })
        .catch(error=>{
            if( error.response)
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            this.stopLoading();
        })
    }
    closeCreateHobby() {
        if (this.props.isOpen){
          this.props.onSetOpen({
            isCreateHobbyOpen: false
          });
        }
    }
    handleCreateHobbyClick(ev){
        ev.stopPropagation()
    }
    render(){
        const createHobbyOverlayStyle = {};
        const createHobbyStyle = {};
        const createHobbyContainerStyle = {};

        if (this.props.isOpen) {
            // zoom open composer
            createHobbyStyle.transform = `scale(1)`;
            createHobbyStyle.opacity =1;
            createHobbyStyle.WebkitTransform = `scale(1)`;

            createHobbyContainerStyle.visibility = `visible`;

            // show overlay
            createHobbyOverlayStyle.opacity = 0.8;
            createHobbyOverlayStyle.visibility = "visible";
        }
        return (
            <div className="" >

                <div
                    className="overlay"
                    style={createHobbyOverlayStyle}
                />
                 <div
                    className="create-hobby__container"
                    style={createHobbyContainerStyle}
                    onClick={this.handleCreateHobbyContainerClick}
                >
                    <div
                        className="create-hobby"
                        style={createHobbyStyle}
                        onClick={this.handleCreateHobbyClick}
                    >
                        <div className="top">
                            <button
                                className="back-btn to-left btn reset-btn"
                                onClick={this.backButtonClicked}
                            >
                                <i className="uil uil-arrow-left"></i>
                            </button>
                            <h4 className="title text-center">Create </h4>
                        </div>
                        <form className="form" action="/hobby/create" onSubmit={this.handleSubmit}>
                            <div className="form-top">
                                <TextInput
                                    name="name"
                                    placeholder={this.state.formControls.name.placeholder}
                                    id="name"
                                    label= {this.state.formControls.name.label}
                                    value={this.state.formControls.name.value}
                                    onChange={this.handleChange}
                                    touched={this.state.formControls.name.touched}
                                />
                            </div>
                            <div className="form-bottom">
                                {/* <div className="form-group">
                                    <button className="btn big-btn color-pink-btn ripple form-btn" > Create <i className="uil uil-message"></i></button>
                                </div> */}
                                <Button
                                    value={`Create`}
                                    icon={true}
                                    isFormValid={this.state.isFormValid}
                                    isLoading={this.state.isLoading}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default CreateHobby;

