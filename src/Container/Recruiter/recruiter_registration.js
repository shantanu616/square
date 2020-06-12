import React from 'react';
import {USERID,CREATERECRUITER} from '../../url.js'
import LoadingGif from '../../Component/Loader/main_loader'
import Header from './Component/header';
import InputBox from '../../Component/InputBox';
import TextArea from '../../Component/textarea';
import Button from '../../Component/button';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import cogoToast from 'cogo-toast';

class RecruiterRegistration extends React.Component
{
    state={loading:false,loading_msg:'Please Wait',btn_disabled:false,err_result:[]}
    componentDidMount()
    {
    }

    onSubmitForm=(e)=>
    {
        e.preventDefault();
        this.setState({btn_disable:true,err_result:[]});
        var company_name=e.target.company_name.value.trim();
        var contact_number=e.target.contact_number.value.trim();
        var company_address=e.target.company_address.value.trim();
          if( company_name=='' || company_address=='' || contact_number=='')
          {
              cogoToast.error('Please Fill Your Address Details');
              this.setState({btn_disable:false});
              return false;
          }
          if(contact_number.length<=9)
          {
              cogoToast.error('Contact Number Must Be Of 10 Digits');
              this.setState({btn_disable:false});
              return false;
          }
      axios.post(CREATERECRUITER,{
        'company_name':company_name,'contact':contact_number,'address':company_address
      },{
      headers: {
       'Content-Type': 'application/json;charset=UTF-8',
       'Authorization':"Bearer " + localStorage.getItem('squareboat_web_token'),
      }
      })
      .then(response=>{
        if(response.data.success==3)
        {
          var err_result=response.data.data;
          this.setState({btn_disable:false,err_result:response.data.error});
              $("html, body").animate({ scrollTop: 0 }, "slow");
          return false;
        }
        if(response.data.success=='1')
        {
          localStorage.setItem('recruiter_id',response.data.recruiter_id);
          this.setState({btn_disable:false});
          this.setState({loading:true,loading_msg:'Please Wait While We Are Creating Your Dashboard'});
          setTimeout(()=>{
            window.location.reload()
             },2000);
           // this.props.history.push('/');
           //    this.props.history.replace('/recruiter');
        }
        else 
        {
          this.setState({btn_disable:false});
          cogoToast.error('Something Went Wrong');
        }
      })
      .catch( (error)=> {
        this.setState({btn_disable:false});
        cogoToast.error('Something Went Wrong');
      });
   }
  render()
  {
    const {loading,loading_msg,btn_disabled,err_result:[]}=this.state;
    if(!loading)
    {
      return(
        <section>
          <Header/>
            <div class="container  p-5 ">
              <div class="row justify-content-md-between">
                <div class="col-md-2" ><h1 style={{color:'#4f699d'}}>Recruiter Registration</h1></div>
                <div class="col-md-6">
                  <form class="" onSubmit={this.onSubmitForm}>
                      <div class="form-group">
                        <label for="company_name">Company Name</label>
                        <InputBox type="text" placeholder="Company Name" name="company_name" id="company_name" class="form-control" required={true}/>
                      </div>
                      <div class="form-group">
                        <label for="contact_number">Contact Number</label>
                        <InputBox type="text" placeholder="Contact Number" name="contact_number" id="contact_number" class="form-control" required={true}/>
                      </div>
                      <div class="form-group">
                        <label for="company_address">Company Address</label>
                        <TextArea class="form-control" id="company_address" name="company_address" placeholder="Company Address"/>
                      </div>
                      <Button type="submit" disabled={btn_disabled}/>
                  </form>
                </div>
              </div>
            </div>
        </section>
       )
    }
    else 
    {
      return(<LoadingGif message={loading_msg}/>)
    }
  }
}



export default RecruiterRegistration;
