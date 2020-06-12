import React, { Component } from 'react';
import Header from './Component/header';
import Footer from './Component/footer';
import routes from './routes';
import Parent from './Component/Parent'
import {Route,Switch} from "react-router-dom";
import axios from 'axios';
import {PLATFORM,USERID,GETHOMEDATA} from './url';
import Loader from './Component/Loader/main_loader'
 class App extends Component
 { 
  state={isLoading:true,jobid:0}
  // componentDidMount()
  // {
  //   axios.get(GETHOMEDATA).then((res)=>{
  //     if(res.data.success==1)
  //     {
  //       let response=res.data;
  //       this.setState({isLoading:true})
  //     }
  //   }).catch((error)=>{

  //   })
  // }
  render() 
  {
    const {isLoading}=this.state
    if(isLoading)
    {
    return(
        <Parent>
          <Header {...this.props} catchJobTitle={(val)=>this.setState({jobid:val})} />
          <Switch>
            {routes.map((route,idx)=>{
              return(route.component ? (<Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                    <route.component {...props} jobid={this.state.jobid}/>
                  )} />)
                  : (null))
            })}
          </Switch>  
          <Footer/>
        </Parent>
    );
    }
    else
    {
      return(<Loader />)
    }
  }
}

export default App;