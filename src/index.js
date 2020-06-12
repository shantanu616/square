import React from 'react';
import ReactDOM from 'react-dom';
import {Switch,HashRouter,Route} from "react-router-dom";
import App from './App';
import Login from './Container/Login/login' 
import ScrollToTop from './Container/scrolltotop'
import Recruiter from './Container/Recruiter/recruiter_home';
import {GETJOBCATEGORY} from './url';
import axios from 'axios'
class MainContainer extends React.Component
{
	state={jobCategory:[]}
	componentDidMount()
	{
		if(localStorage.getItem('jobportal_version')==null)
		{
		  localStorage.clear();
		  localStorage.setItem('jobportal_version','1.0');

		}
		else if(localStorage.getItem('jobportal_version')!='1.0')
		{
		  localStorage.clear();
		  localStorage.setItem('jobportal_version','1.0')
		}
	    this.setStorage();
	    this.getJobCategory();
   }
  setStorage=()=>{
  	localStorage.setItem('url','/');
    if(localStorage.getItem('user_id')==null )
    {
      localStorage.setItem('user_id',0)
    }
   }
   getJobCategory=()=>{
   	axios.get(GETJOBCATEGORY).then((res)=>{
   		if(res.data.success==1)
   		{
   			this.setState({jobCategory:res.data.data})
   		}
   	})
   }
	render()
	{
		const {jobCategory}=this.state
		return(
	    <HashRouter>
	      <ScrollToTop />
	      <Switch>
		      <Route path="/" exact={true} component={(props)=><App {...props} getJobCategory={jobCategory}/>}/>
		      <Route path="/login" component={Login} />
		      <Route path="/recruiter" component={(props)=><Recruiter {...this.props}  getJobCategory={jobCategory}/>} />
	      </Switch>
	    </HashRouter>)
    }
 }
ReactDOM.render( <MainContainer />,document.getElementById('root'));