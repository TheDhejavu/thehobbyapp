import React, { Component } from "react";
import {Slide, Zoom, Fade} from 'react-reveal';
import "./styles.scss";


class PlaceholderButton extends Component {
    constructor( props){
      super(props);
    }
    render() {
      return (
        <button {...this.props}> {this.props.value}</button>
      );
    }
}

class Placeholder extends Component {
  constructor( props){
    super(props);
  }

  render() {
    const placeholderImage = (this.props.placeholderType == "network-error")
                                ?
                                    "./images/undraw_taken.svg"
                                :
                                    "./images/undraw_x.svg";

    return (
      <div className="placeholder flex middle center">
        <div className="placeholder-panel text-center">
          <span className="placeholder-image-container">
            <img src ={placeholderImage} className="placeholder-image"/>
          </span>
          <p className="placeholder-text">{this.props.text}</p>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Placeholder;

export {
    Placeholder,
    PlaceholderButton
}

