import React ,  { Component }from "react";
import { Link } from "react-router-dom";
import { FormButton as Button, TextInput,  PasswordInput} from "../../../../components/form";
import validate, { isAllControlsValid} from "../../../../helpers/validate";
import { toast,ToastContainer } from 'react-toastify';
import {setAuthToken, BASE_URL } from "../../../../helpers/auth";
import Axios from "axios";


class Login extends Component{
    constructor(props) {
        super(props);

        this.state = {
            formControls: {
                email: {
                    value: '',
                    label:"Email address",
                    touched: false,
                    placeholder: 'E.G joe@example.com',
                    validationRules: {
                        isRequired: true,
                        isEmail: true
                    },
                    validation:{
                        error: false,
                        message: ""
                    }
                },

                password: {
                    value: '',
                    label:"Password",
                    touched: false,
                    placeholder: '***********',
                    validationRules: {
                        isRequired: true,
                        minLength: 6
                    },
                    validation:{
                        error: false,
                        message: ""
                    }
                },
            },
            isFormValid: false,
            isLoading: false,
        }

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
        // updatedFormElement.validation = validate(value, updatedFormElement.label, updatedFormElement.validationRules);

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
    handleError( response ){
        let error = response.data.data;

        if(error.errors){
            let updatedControls = {
                ...this.state.formControls
            }
            for(let i in error.errors){
                updatedControls[i].validation = error.errors[i];
            }

            this.setState({
                ...this.state,
                formControls: updatedControls,
            });
        }

        return toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT
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

        Axios.post(`${BASE_URL}/api/login`, {
            "email": this.state.formControls.email.value,
            "password": this.state.formControls.password.value,
        })
        .then( response=>{
           if(response.data.code == "OK"){
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });

            setAuthToken(response.data.data.token);
            this.props.history.push({pathname: "/" })
           }
           this.stopLoading();
        })
        .catch(error=>{

            this.handleError(error.response);
            this.stopLoading();
        })
    }
    render(){
        return(
            <main className="main auth-main login-main ">
                <div className="auth-content login-content ">
                    <div className="auth-content__panel">
                        <ToastContainer />
                        <div className="auth-content__main login-content__main">
                            <div className="auth-content__top text-center">

                                <h4 className="heading">Login</h4>
                                <p className="text"> <i className="uil uil-padlock"></i> login securely to your account.</p>
                            </div>
                            <form className="form" onSubmit={this.handleSubmit} autoComplete="off">
                                <TextInput
                                    name="email"
                                    placeholder={this.state.formControls.email.placeholder}
                                    id="email"
                                    label= {this.state.formControls.email.label}
                                    value={this.state.formControls.email.value}
                                    onChange={this.handleChange}
                                    touched={this.state.formControls.email.touched}
                                    {...this.state.formControls.email.validation}
                                />
                                <PasswordInput
                                    name="password"
                                    placeholder={this.state.formControls.password.placeholder}
                                    id="password"
                                    label= {this.state.formControls.password.label}
                                    value={this.state.formControls.password.value}
                                    onChange={this.handleChange}
                                    touched={this.state.formControls.password.touched}
                                    {...this.state.formControls.password.validation}
                                />
                                <Button
                                    value="Log in"
                                    isFormValid={this.state.isFormValid}
                                    isLoading={this.state.isLoading}
                                />
                            </form>
                            <div className="auth-content__bottom text-center">
                                <p className="name">Don't have an account? <Link to={"/signup"}>Sign up</Link></p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        )
    }
}


export default  Login;