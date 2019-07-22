import React, { Component } from "react";
import  Layout from "../../components/Layout";
import  Placeholder, { PlaceholderButton } from "../../components/Placeholder";
import { CardContainer , CardContent } from "../../components/Card";
import Axios from "axios";
import {  DialogContainer } from "../../components/dialog";
import {  PulseLoader } from 'react-spinners';
import {getToken, BASE_URL} from "../../helpers/auth";
import "./styles.scss";

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      data: [],
      isLoading: true,
      pageError: false
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.reload = this.onReload.bind(this);
    this.updateContent = this.updateContent.bind(this);
  }
  componentDidMount(){
      this.loadContent()
  }
  updateContent( item){

    this.setState({
      data: [...this.state.data, item]
    });
  }
  handleDelete(itemId){
    const data = this.state.data.filter(item => item.id !== itemId)
    this.setState({data})
  }
  loadContent(){

        Axios.defaults.headers.Authorization = getToken();
        Axios.get(`${BASE_URL}/api/hobbies`)
        .then( response=>{
          if(response.data.code == "OK"){

            this.setState({
              ...this.state,
              isLoading: false,
              pageError:  false,
              data: response.data.data.hobbies
            })
          }
        })
        .catch(error=>{
          this.setState({
            ...this.state,
            isLoading: false,
            pageError:  true
          })

        })

  }
  onReload(){
    this.setState({
      ...this.state,
      isLoading: true,
      pageError:  false
    });

    this.loadContent()
  }

  render() {
     const { data } = this.state;
     let renderContent;
      if(!this.state.isLoading){
        if(data.length >= 1)
        {
          renderContent = data.map(data=>{
              return (<CardContainer key={data.id} columnType="col-s-25" className="">
                        <CardContent
                            id={data.id}
                            hobby={data.name}
                            onDelete={this.handleDelete}
                            createdDate={data.createdAt}
                        />
                    </CardContainer>
                  )
            })

        }else{
          renderContent =( <Placeholder
              text="We have nothing to display at this time.. use the create button to create a new hobby"
              placeholderType="network-error"
          >
              <PlaceholderButton
                className="btn big-btn color-pink-btn ripple"
                value ="Reload"
                onClick = {this.reload}
              />
          </Placeholder>)

        }
      }else{
        renderContent =  (
          <div className="flex middle center loader-container">
              <PulseLoader size={20} color={"#fff"}/>
           </div>
        )
    }
    return (
      <Layout page="Home" updateContent={this.updateContent}>
           <DialogContainer />
          <div className="flex flex--wrap">
         {
           (!this.state.pageError)?
            renderContent
           :
            <Placeholder
                text="Whoops!!! something went wrong.."
                placeholderType="info"
            >
                <PlaceholderButton
                  className="btn big-btn color-pink-btn ripple"
                  value ="Reload"
                  onClick = {this.reload}
                />
            </Placeholder>
           }

        </div>
      </Layout>
    );
  }
}

export default Home;