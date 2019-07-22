import React, { Component } from "react";
import Axios from "axios";
import {removeAuthToken, isAuthenticated} from "../../helpers/auth";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';
import Dropdown from "../Dropdown";
import "./styles.scss";

class Header extends Component{
    constructor( props ){
        super(props);
        this.state ={
            visible: false,
            isDialogOpen: false,
            user: {}
        }

        this.triggerNode = null;
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.onToggleDropdown = this.onToggleDropdown.bind(this);
        this.logout = this.onLogout.bind(this)
    }
    componentDidMount(){
        this.setState({
            ...this.state,
            user: isAuthenticated().user
        })
    }
    onLogout(e){
        e.preventDefault()

        Axios.get("http://localhost:1337/api/logout")
        .then( response=>{
           if(response.data.code == "OK"){
                toast.success(response.data.message, {
                    position: toast.POSITION.TOP_RIGHT
                });

                removeAuthToken()
                window.location.href = "/login";
           }

        })
        .catch(error=>{
            if( error.response)
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log( error)
        })
    }
    onToggleDropdown(visible){
        this.setState({
            visible: visible
        })
    }
    toggleDropdown( ){
        this.setState({
            visible: !this.state.visible
        })
    }
    render(){

        const avatarImage = `/images/${this.state.user.avatar}`;
        return (
            <header className="app-header">

                <div className="app-header__panel">
                    <div className="app-header__left flex">
                    <button
                        className="harmburger-btn btn reset-btn desktop"
                        onClick={this.props.toggleDesktopSidebar}
                    >
                        <i className='uil uil-bars'></i>
                    </button>
                    <button
                        className="harmburger-btn btn reset-btn mobile"
                        onClick={this.props.openMobileSidebar}
                    >
                        <i className='uil uil-bars'></i>
                    </button>
                    </div>
                    <nav className="app-header__nav to-right">
                    <ul >
                        <li className="profile list">
                            <div className="flex"
                                onClick={this.toggleDropdown}
                                ref={ node => this.triggerNode = node}
                            >
                                <img src={avatarImage} className="profile-image" alt="profile image"/>
                                <p className="name">{this.state.user.fullName}</p>
                            </div>
                            <Dropdown
                                visible= {this.state.visible}
                                toggleDropdown={this.onToggleDropdown}
                                triggerNode = {this.triggerNode}
                                styles={{
                                    top: "40px",
                                    right: "10px",
                                    width: "160px",
                                }}
                            >
                                <ul >
                                    <li>
                                        <Link to="#"  onClick={this.logout}><i className="uil uil-exit"></i> Logout</Link>
                                    </li>
                                </ul>
                            </Dropdown>
                        </li>
                    </ul>
                    </nav>
                </div>
            </header>
        );
    }
}
export default Header;

