import React from 'react';
import {Link} from 'react-router-dom';
import $ from 'jquery';
import {LOGOUT} from '../url';
import axios from 'axios';
class Header extends React.Component{
    state={
        login_status:true,isLoading:false
    }
     logoutHandler=()=>{
        $('#error_msg').html('');
        const HEADER = {
            headers: {
             'Content-Type': 'application/json;charset=UTF-8',
             'Accept':'application/json',
             'Authorization':"Bearer " + localStorage.getItem('squareboat_web_token'),
            }
            };
        axios.post(LOGOUT,{},HEADER).then((res)=>{
            if(res.data.success==3)
            {

            } 
            else if(res.data.success==1)
            {
                localStorage.clear();
               this.setState({isLoading:false})
                //this.props.history.replace('/')
                window.location.reload('/')
            }
            else if(res.data.success==2)
            {
                $('#error_msg').html(res.data.msg)
            }
        }).catch((error)=>{

        }) 
     }
     catchJobTitle=(id)=>{
      $('.dropdown-item').removeClass('active');
      $('#job_title_'+id).addClass('active');
      this.props.catchJobTitle(id)
     }
  	render()
  	{
  	return(
          <header>
              <div class="shadow-sm ">
                  <nav class="navbar navbar-expand-lg navbar-light " style={{backgroundColor:'rgb(240, 245, 251)'}}>
                    <a class="navbar-brand" href="#"><img src="images/logo.png" width="40" height="40" alt=""/></a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul class="navbar-nav mr-auto">
                          <form class="form-inline my-2 my-lg-0">
                          <div class="dropdown">
                            <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                              Job Title
                            </button>
                            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                              <a id="job_title_0" class="dropdown-item active" href="javascript:" onClick={()=>{this.catchJobTitle(0)}}>All</a>
                              {this.props.getJobCategory.length>0 && this.props.getJobCategory.map((res,key)=>{
                                return(<a id={`job_title_${res.id}`} class="dropdown-item " href="javascript:" key={key} onClick={()=>{this.catchJobTitle(res.id)}}>{res.title}</a>)
                              })}
                            </div>
                          </div>
                            {/*<input class="form-control mr-sm-2" type="search" placeholder="keywords" aria-label="Search"/>*/}
                          </form>
                      </ul>
                      <li class="nav-item">
                          <a  href="javascript:" class="nav-link" onClick={()=>{localStorage.setItem('url','/recruiter');this.props.history.push('/recruiter')}}>Become Recruiter</a>
                      </li>
                      {localStorage.getItem('squareboat_web_token')==null && <a href="javascript:" class="nav-link disabled" onClick={()=>{localStorage.setItem('url','/');this.props.history.push('/login')}}>Login</a>}
                      {localStorage.getItem('squareboat_web_token')!=null && <a href="javascript:" class="nav-link disabled" onClick={this.logoutHandler}>Logout</a>}
                    </div>
                  </nav>
              </div>
          </header>)
  	}
}
export default Header