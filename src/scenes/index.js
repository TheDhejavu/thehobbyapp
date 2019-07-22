import React , { Component } from "react";
import { Route ,Switch,Redirect,  BrowserRouter as Router } from "react-router-dom";
import { isAuthenticated } from "../helpers/auth";
import Home from "./Home";
import { Login, Signup } from "./Auth";
import NotFound from "./NotFound";
import "./styles.scss";


const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      isAuthenticated()
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/login'
          }} />
    )} />
)

const PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
      !isAuthenticated()
        ? <Component {...props} />
        : <Redirect to={{
            pathname: '/'
          }} />
    )} />
)

class Layout extends Component{
    constructor(){
        super()
    }

    render(){
        return(
            <Router>
                <Switch>
                    <PrivateRoute  exact path={"/"} component={Home}></PrivateRoute>
                    <PublicRoute  path={"/signup"} component={Signup}></PublicRoute>
                    <PublicRoute  path={"/login"} component={Login}></PublicRoute>
                    <Redirect path={"/logout"}  to={"/login"} ></Redirect>
                    <Route path={"*"} component={NotFound} />
                </Switch>
            </Router>
        )
    }
}

export default  Layout
