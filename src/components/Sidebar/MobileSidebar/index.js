import React, { Component } from "react";
import PropTypes from "prop-types";
import {  NavLink } from "react-router-dom";
import "./styles.scss";

class MobileSidebar extends Component{
    constructor( props){
        super(props)
        this.state = {}
        this.overlayClicked = this.closeMobileSidebar.bind(this);
        this.backButtonClicked = this.closeMobileSidebar.bind(this);
    }
    closeMobileSidebar() {
        if (this.props.isOpen) {
          this.props.onSetOpen({
            isMobileSidebarOpen: false
          });
        }
    }
    render(){
        const sidebarStyle = {};
        const sidebarOverlayStyle = {};

        if (this.props.isOpen) {
            // slide open sidebar
            sidebarStyle.transform = `translateX(0%)`;
            sidebarStyle.WebkitTransform = `translateX(0%)`;

            // show overlay
            sidebarOverlayStyle.opacity = 0.5;
            sidebarOverlayStyle.visibility = "visible";
        }
        return (
            <div className="mobile-sidebar__container" >
                <div
                    className="overlay"
                    style={sidebarOverlayStyle}
                    onClick={this.overlayClicked}
                />
                 <div className="mobile-sidebar sidebar" style={sidebarStyle} >
                    <div className="sidebar-panel">
                        <div className="sidebar-top">
                            <div className="logo-container text-center">
                                <h2 className="logo">Hobby App. </h2>
                            </div>
                        </div>
                        <nav className="sidebar-nav">
                            <button onClick={this.props.openCreateHobby} className="create-btn dash-size-btn color-pink-btn btn ripple">
                                <i className='uil uil-pen'></i> Create
                            </button>
                            <ul className="nav-lists__top">
                                <li>
                                    <NavLink to={"/" }  activeClassName='active' className="ripple"><i className='uil uil-home'></i> Home</NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

MobileSidebar.propTypes = {
    // boolean if sidebar should slide open
    isOpen: PropTypes.bool,

    // callback called when the overlay is clicked
    onSetOpen: PropTypes.func,
};

export default MobileSidebar;

