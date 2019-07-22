import React, { Component } from "react";
import { Link  } from "react-router-dom";
import { Fade} from 'react-reveal';

import "./styles.scss";

class PageNotFound extends Component {
  constructor(props){
    super(props)
  }
  render() {
    return (
      <main className="main page-not__found">
            <div className="page-not__found__content flex flex--wrap">
                <div className="content-left col-s-60">
                  <div className="content-left__panel"></div>
                </div>
                <div className="content-right col-s-40 flex middle text-left">
                  <Fade bottom>
                    <div className="content-right__panel">
                        <h3 className="mini-heading">OOPS!!</h3>
                        <h1 className="heading">Page not found</h1>
                        <p className="summary"> Sorry we couldn't find the page you are looking for.</p>

                        <Link to={"/"} className="big-btn btn color-pink-btn ripple">
                          Go Home <span className="uil uil-message"></span>
                        </Link>
                    </div>
                  </Fade>
                </div>
            </div>
      </main>
    );
  }
}
export default PageNotFound;

