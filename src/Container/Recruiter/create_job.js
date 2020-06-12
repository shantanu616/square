import React from 'react';
import {USERID,CREATEJOB} from '../../url.js'
import LoadingGif from '../../Component/Loader/main_loader'
import InputBox from '../../Component/InputBox';
import Authentication from './Authentication';
import Button from '../../Component/button';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';
import $ from 'jquery';
import cogoToast from 'cogo-toast';
import TextArea from '../../Component/textarea';
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
        var title=e.target.job_title.value.trim();
        var description=e.target.job_description.value.trim();
        var job_title_id=e.target.job_title_id.value.trim();
        var salary=e.target.salary.value.trim();
          if( title=='' || description=='' || job_title_id=='' || salary=="")
          {
              cogoToast.error('Please Fill Your Address Details');
              this.setState({btn_disable:false});
              return false;
          }
        axios.post(CREATEJOB,{
          title,description,job_title_id,salary
        },this.props.HEADER)
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
            this.setState({loading:true,loading_msg:'Please Wait While We Are Creating Your Job'});
            setTimeout(()=>{
                this.props.history.push('/');
                this.props.history.replace('/recruiter');},1000);
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
    const {getJobCategory}=this.props
    if(!loading)
    {
      return(
        <section class="wrapper">
            <div class="container  p-5 ">
              <div class="row justify-content-md-between">
                <div class="col-md-6" ><h1 style={{color:'#4f699d'}}>Create New Job</h1></div>
                <div class="col-md-6">
                  <form class="" onSubmit={this.onSubmitForm}>
                      <div class="form-group">
                        <label for="job_title">Job Title</label>
                        <InputBox type="text" placeholder="Job Title" name="job_title" id="job_title" class="form-control" required={true}/>
                      </div>
                      <div class="form-group">
                          <label for="job_title_id">Job Title</label>
                          <select class="form-control" id="job_title_id" name="job_title_id">
                              <option selected disabled value="">Select Title</option>
                              {getJobCategory.length>0 && getJobCategory.map((res,key)=>{
                                return(<option value={res.id} key={key}>{res.title}</option>)
                              })}
                          </select>
                      </div>
                      <div class="form-group">
                        <label for="salary">Salary Offered</label>
                        <InputBox type="text" placeholder="Salary Offered" name="salary" id="salary" class="form-control" required={true}/>
                      </div>
                      <div class="form-group">
                        <label for="job_description">Job Description</label>
                        <TextArea class="form-control" id="job_description" name="job_description" placeholder="Job Description" required={true}/>
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



export default Authentication(RecruiterRegistration);
