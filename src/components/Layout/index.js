import React, { Component } from "react";
import  Header from "../Header";
import { DesktopSidebar , MobileSidebar} from "../Sidebar";
import { toast, ToastContainer } from 'react-toastify';
import Footer from "../Footer";
import CreateHobby from "../Createhobby";

import "./styles.scss";

class Layout extends Component{
  constructor(props){
    super(props);
    this.state = {
      isCreateHobbyOpen: false,
      isMobileSidebarOpen: false,
      isDesktopSidebarMinimal: false
    }

    this.onSetOpen = this.onSetOpen.bind(this);
    this.openCreateHobby = this.openCreateHobby.bind(this);
    this.openMobileSidebar = this.openMobileSidebar.bind(this);
    this.toggleDesktopSidebar = this.toggleDesktopSidebar.bind(this)
  }
  onSetOpen(state) {
    document.body.style.overflowY = (state.isCreateHobbyOpen )? "hidden" : "scroll";

    this.setState( state );
  }

  openCreateHobby(ev){
    ev.preventDefault();
    this.onSetOpen(
      {
        isCreateHobbyOpen: !this.state.isCreateHobbyOpen
      }
    );
  }
  openMobileSidebar(ev){
    ev.preventDefault();
    this.onSetOpen(
      {
        isMobileSidebarOpen: !this.state.isMobileSidebarOpen
      }
    );
  }
  toggleDesktopSidebar(ev){
    ev.preventDefault();
    this.setState( {
      isDesktopSidebarMinimal: !this.state.isDesktopSidebarMinimal
    });

  }
  render() {
    const createHobbyProps = {
      isOpen: this.state.isCreateHobbyOpen,
      onSetOpen: this.onSetOpen,
      updateContent: this.props.updateContent
    }
    const appLayoutClassName = `app-layout ${(this.state.isDesktopSidebarMinimal)? "minimal-view" : ""}`
    return (
      <div className={appLayoutClassName}>
         <DesktopSidebar
            openCreateHobby={this.openCreateHobby}
          />
          <MobileSidebar
            openCreateHobby={this.openCreateHobby}
            isOpen= {this.state.isMobileSidebarOpen}
            onSetOpen= {this.onSetOpen}
          />
          <Header
             toggleDesktopSidebar={this.toggleDesktopSidebar}
             openMobileSidebar={this.openMobileSidebar}
          />
          <main className="app-layout__main">
            <div className="app-content">
                <h4 className="heading"> {this.props.page }</h4>
                {this.props.children}
            </div>
            <CreateHobby {...createHobbyProps}/>
            <ToastContainer autoClose={5000} />
            <Footer/>
          </main>
      </div>
    );
  }
}

export default Layout;