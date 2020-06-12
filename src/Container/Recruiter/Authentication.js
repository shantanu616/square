import React from 'react';
import {Redirect} from 'react-router-dom';
import RecruiterRegistration from "./recruiter_registration.js"
import {USERID,AUTHENTICATERECRUITER} from '../../url.js';
import axios from 'axios';
import Loader from '../../Component/Loader/main_loader';
const RecruiterAuth=(OldComponent)=>{
  class NewComponent extends React.Component{
    state={status:0,isLoading:false,loading_msg:'Please Wait'}
    componentDidMount()
    {
      if(localStorage.getItem('user_id')!=0)
      {
        this.getStatus();
      }
      else
      {
        this.setState({isLoading:true})
      }
    }
    getStatus=()=>
    {
      const HEADER = {
      headers: {
       'Content-Type': 'application/json;charset=UTF-8',
       'Accept':'application/json',
       'Authorization':"Bearer " + localStorage.getItem('squareboat_web_token'),
      }
      };
      axios.post(AUTHENTICATERECRUITER,{'user_id':localStorage.getItem('user_id')},HEADER).then((res)=>{
        if(res.data.success==1)
        {
          this.setState({status:1,isLoading:true});
          localStorage.setItem('recruiter_id',res.data.recruiter_id);
        }
        else if(res.data.success==2)
        {
          this.setState({isLoading:true,status:2})
        }
        else 
        {
          this.setState({isLoading:true})
        }
        }).catch((error)=>{
        })
    }
    render()
    {
      const {isLoading,status,loading_msg}=this.state;
      const HEADER={
      headers: {
       'Content-Type': 'application/json;charset=UTF-8',
       'Accept':'application/json',
       'Authorization':"Bearer " + localStorage.getItem('squareboat_web_token'),
      }
      };
      if(isLoading)
      {
        if(localStorage.getItem('user_id')!=0 && status==1)
        {
        return(<OldComponent {...this.props} HEADER={HEADER}/>)
        }
        else if(localStorage.getItem('user_id')!=0 && status==0)
        {
        return(<RecruiterRegistration {...this.props}/>)
        }
        else {
          return(<Redirect to="/login"/>)
        }
      }
      else {
        return(<Loader message={loading_msg}/>)
      }
    }
  }
  return NewComponent;
}

export default RecruiterAuth;
