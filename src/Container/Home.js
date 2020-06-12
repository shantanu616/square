import React from 'react';
import SearchComponent from '../Component/searchcomponent';
import {Link} from 'react-router-dom';
import {GETALLJOBSBEFORE,GETALLJOBSAFTER,APPLYJOB} from '../url';
import axios from 'axios';
import Pagination from "react-js-pagination";
import Loader from '../Component/Loader/main_loader';
import cogoToast from 'cogo-toast';
import $ from 'jquery'
class Home extends React.Component
{
    state={jobList:[],jobid:0,isLoading:false,loading_msg:'Please Wait',categoryList:[],currentPage:1,total:1,itemsCountPerPage:10,pageRangeDisplayed:3}
    componentDidMount()
    {
        this.setState({jobid:this.props.jobid},function(){
         this.getData(1,'')
        })
    }
    getData=(page,keyword)=>{
         const HEADER = {
          headers: {
           'Content-Type': 'application/json;charset=UTF-8',
           'Accept':'application/json',
           'Authorization':"Bearer " + localStorage.getItem('squareboat_web_token'),
          }
          };
          let url=GETALLJOBSBEFORE;
          if(localStorage.getItem('user_id')==0)
          {
            url=GETALLJOBSBEFORE
          }
          else
          {
            url=GETALLJOBSAFTER
          }
        axios.post(`${url}?page=${page}`,{
            'searchKeyword':keyword,
            'jobid':this.state.jobid
        },HEADER).then((res)=>{
            if(res.data.success==1)
            {
              var response=res.data.data;
              this.setState({currentPage:response.current_page,jobList:response.data,total:response.total});
              setTimeout(()=>this.setState({isLoading:true}),1000)
            }
        }).catch((error)=>{

        })
    }
    componentDidUpdate()
    {
      if(this.props.jobid!=this.state.jobid)
      {
        this.setState({jobid:this.props.jobid},function(){
          this.getData(1,'')
        })
      }
    }
    JobApply=(id)=>{
        const HEADER = {
          headers: {
           'Content-Type': 'application/json;charset=UTF-8',
           'Accept':'application/json',
           'Authorization':"Bearer " + localStorage.getItem('squareboat_web_token'),
          }
          };
      $('#apply_id_'+id).html('Loading..');
      axios.post(APPLYJOB,{job_id:id},HEADER).then((res)=>{
        if(res.data.success==1)
        {
          $('#apply_id_'+id).html('Apply');
         cogoToast.success("Job Applied Successfully");
         this.getData(1,'');
        }
        else
        {
          $('#apply_id_'+id).html('Apply');
          cogoToast.error("Something Went Wrong");
        }
      })
    }
	render()
	{
    const {jobList,isLoading,loading_msg,jobid,total}=this.state;
    if(isLoading)
    {
      	return(<section class="wrapper">
              <div class="m-5 p-2" style={{}}>
                  {jobList.length>0 && jobList.map((res,key)=>{
                      return(<div class="row" key={key}>
                      <div class="col-md-8" style={{backgroundColor:''}}>
                       <div class="card">
                          <div class="card-body">
                              <h5 class="card-title">{res.title}</h5>
                              <p class="card-text">{res.description}</p>
                              <p class="font-weight-bold">Salary:<span class="label label-default "><i class="fa fa-rupee"></i>{res.salary}</span></p>
                              {localStorage.getItem('user_id')!=0 && <button  class={`btn ${res.applied_jobs==null?"btn-primary":"btn-success"}`} id={`apply_id_${res.id}`} onClick={()=>this.JobApply(res.id)}>{res.applied_jobs==null?"Apply":"Applied"}</button>}
                              {localStorage.getItem('user_id')==0 && <Link to="/login" class="btn btn-primary" >Apply</Link>}
                          </div>
                      </div>
                      </div>
                  </div>)
                  })}
                {total>1 && <div class="float-right mt-3">
                  <Pagination
                      activePage={this.state.currentPage}
                      itemsCountPerPage={this.state.itemsCountPerPage}
                      totalItemsCount={this.state.total}
                      pageRangeDisplayed={this.state.pageRangeDisplayed}
                      onChange={this.getData}
                      itemClass='page-item'
                      linkClass="page-link bold"
                   />
              </div>}
              </div>
              </section>)
    }
    else
    {
      return(<Loader message={loading_msg}/>)
    }
	}
}
export default Home