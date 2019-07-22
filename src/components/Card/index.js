import React, { Component} from "react";
import { fadeIn} from 'react-animations';
import styled, { keyframes } from 'styled-components';
import Moment from '../../../node_modules/moment';
import Dropdown from "../Dropdown";
import "./styles.scss";
import Axios from "axios";
import {getToken} from "../../helpers/auth";
import { toast } from 'react-toastify';
import { Dialog } from "../../components/dialog";

const fadeInAnimation = keyframes`${fadeIn}`;
const Element = styled.div`
  animation: 1s ${fadeInAnimation};
`;

const CardContainer = props=>{
    const className = `card ${props.className}`;
    const columnType = `card-container ${props.columnType}`;
    return  (
        <Element className={columnType}>
            <div className={className}>
                {props.children}
            </div>
        </Element>
    );
}

class CardContent extends Component{
    constructor (props){
        super(props)
        this.state = {
            visible: false
        }
        this.triggerNode = null;
        this.onDelete = this.onDelete.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.onToggleDropdown = this.onToggleDropdown.bind(this);
    }
    onDelete(){
        Dialog.open({
            title: "Delete hobby",
            message: "Are you sure you want to permanetly delete this hobby",
            callback: this.delete.bind(this)
        });

    }
    delete(){

        Axios.defaults.headers.Authorization = getToken();
        Axios.delete(`http://localhost:1337/api/hobby/delete/${this.props.id}`)
        .then( response=>{
          if(response.data.code == "OK"){
            toast.success(response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            this.props.onDelete( this.props.id );
          }
        })
        .catch(error=>{
            toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_RIGHT
            });
            console.log( error.response)
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
        return  (
        <div className="card-content">
            <div className="top">
                <p className="created_date">
                    <i className='uil uil-calendar-alt'></i>
                    {Moment(this.props.createdDate).fromNow()}
                </p>
                <div className="top-right">
                    <button
                      onClick={this.toggleDropdown}
                      ref={ node => this.triggerNode = node}
                      className="more-btn btn to-right reset-btn"
                    >
                        <i className='uil uil-ellipsis-v'></i>
                    </button>
                    <Dropdown
                      visible= {this.state.visible}
                      triggerNode = {this.triggerNode}
                      toggleDropdown={this.onToggleDropdown}
                      styles={{
                        top: "40px",
                        right: "1px",
                      }}
                    >
                        <ul >
                          <li>
                            <span onClick={this.onDelete}><i className="uil uil-trash"></i> Delete </span>
                          </li>

                        </ul>
                    </Dropdown>
                  </div>
            </div>
            <h4 className="hobby">{this.props.hobby}</h4>
        </div>
    );
}
}

export {
    CardContainer,
    CardContent
}