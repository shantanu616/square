import React from 'react';
import {Redirect} from 'react-router-dom'
import Login from "../Login/login.js"
const Auth=(OldComponent)=>{
  class NewComponent extends React.Component{
    render()
    {
      if(localStorage.getItem('squareboat_web_token')!=0)
      {
      return(<OldComponent {...this.props}/>)
      }
      else {
        return(<Redirect to="/login"/>)
      }
    }
  }
  return NewComponent;
}

export default Auth;
