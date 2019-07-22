import React, { Component } from "react";
import PropTypes from "prop-types";
import "./styles.scss";

class Dropdown extends Component{
    constructor( props){
        super(props)
        this.state = {};
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
      document.addEventListener('mousedown', this.handleClickOutside, false);
    }
    componentWillUnmount() {
      document.removeEventListener('mousedown', this.handleClickOutside, false);
    }
    handleClickOutside(ev) {
        if(!this.props.triggerNode) return;

        if(this.props.triggerNode.contains(ev.target) || this.node.contains(ev.target)){
            return
        }
        this.props.toggleDropdown( false);
    }
    render(){
        const className = `dropdown`;
        const dropdownStyle = {
            ...this.props.styles
        };

        if (this.props.visible) {
            // translate open dropdown
            dropdownStyle.transform = `translateY(0px)`;
            dropdownStyle.opacity = "1";
            dropdownStyle.visibility = "visible";
            dropdownStyle.WebkitTransform = `translateY(0px)`;
        }
        return (
            <div className={className} style={dropdownStyle}  ref={ node => this.node = node}>
                <div className="dropdown-panel">
                    <div className="dropdown-arrow" ></div>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Dropdown;

