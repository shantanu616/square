import React from 'react';
import Authentication from './Authentication';
import routes from './routes';
import SearchComponent from '../../Component/searchcomponent';
import {Link} from 'react-router-dom';
import {GETRECRUITERAPPLICATIONSTATUS} from '../../url';
import axios from 'axios';
import Pagination from "react-js-pagination";
import Loader from '../../Component/Loader/main_loader';
import NotFound from '../../Component/not_found/not_found'
class CheckApplication extends React.Component
{
	state={jobList:[],job_id:0,isLoading:false,not_found:false,loading_msg:'Please Wait',categoryList:[],currentPage:1,total:1,itemsCountPerPage:10,pageRangeDisplayed:3}
	componentDidMount()
	{
		this.setState({job_id:this.props.match.params.id},function(){
			this.getData(1,'')
		});
	}
	getData=(page,keyword)=>{
	    axios.post(`${GETRECRUITERAPPLICATIONSTATUS}?page=${page}`,{
	    	job_id:this.state.job_id
	    },this.props.HEADER).then((res)=>{
	        if(res.data.success==1)
	        {
	          var response=res.data.job_list;
	          this.setState({currentPage:response.current_page,jobList:response.data,total:response.total});
	          setTimeout(()=>this.setState({isLoading:true,not_found:false}),1000)
	        }
	        else
	        {
	        	this.setState({not_found:true})
	        }
	    }).catch((error)=>{
	    	// this.setState({not_found:true})
	    })
  	}
  	componentDidUpdate()
  	{
  		if(this.props.match.params.id!=this.state.job_id)
  		{
  			this.setState({job_id:this.props.match.params.id,not_found:false},function(){
				this.getData(1,'')
			});
  		}
  	}
	render()
	{
		const {jobList,isLoading,loading_msg,total,not_found}=this.state;
		const CandidateList=(jobList.length>0 ? jobList.map((res,key)=>{
							    	return(<tr>
								      <th scope="row">{key+1}</th>
								      <td>{res.user_id.name}</td>
								      <td>{res.user_id.email}</td>
								      <td>{res.status==0?<button class="btn btn-danger">Inactive</button>:<button class="btn btn-success">Active</button>}</td>
								    </tr>)
							   }):<tr><td colspan="4"><center>No Result Found</center></td></tr>)
		if(!not_found)
		{
			if(isLoading)
			{
				return(<section class="wrapper">
					   <div class="container">
						<div class="d-flex flex-column ">
							<div class="row mt-3 d-flex ">
								<h2 class="">Candidate List</h2>
								<table class="table table-striped mt-5">
								  <thead>
								    <tr>
								      <th scope="col">SNO</th>
								      <th scope="col">Name</th>
								      <th scope="col">Email</th>
								      <th scope="col">Status</th>
								    </tr>
								  </thead>
								  <tbody>
								  {CandidateList}
								  </tbody>
								</table>
							</div>
	    				    {total>1 && <div class="float-right mt-3"><Pagination
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
	          	 	</div>
	          	 </section>)
			}
			else
			{
				return(<Loader message={loading_msg}/>)
			}
	    }
	    else
	    {
	    	return(<NotFound/>)
	    }
		
	}
}
export default Authentication(CheckApplication)