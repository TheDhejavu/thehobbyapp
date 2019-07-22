import React, { Component } from "react";
import {  NavLink } from "react-router-dom";
import "./styles.scss";

const Sidebar = props=>{
    return (
        <aside className="sidebar desktop-sidebar ">
           <div className="sidebar-panel">
                <div className="sidebar-top">
                    <div className="logo-container text-center">
                        <h2 className="logo">H<span className="will-leave">obby App</span></h2>
                    </div>
                </div>
                <nav className="sidebar-nav">
                    <button onClick={props.openCreateHobby} className="create-btn dash-size-btn color-pink-btn btn ripple">
                        <i className='uil uil-pen'></i>
                        <span className="will-leave">Create</span>
                    </button>
                    <ul className="nav-lists__top">
                        <li>
                            <NavLink to={"/" }  activeClassName='active' className="ripple">
                                <i className='uil uil-home'></i>
                                <span className="will-leave"> Home</span>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
}

export default Sidebar;

